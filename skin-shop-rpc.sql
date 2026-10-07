-- ============================================================
-- 皮肤商店 · 原子购买函数（RPC）
-- 在 Supabase SQL Editor 中执行（在 skin-shop-schema.sql 之后）
-- 作用：把「校验余额 → 扣币 → 写购买记录」放进一个数据库事务，
--       避免并发/中途失败导致的扣币不到账、重复扣币等问题。
-- ============================================================

create or replace function buy_skin(p_user_id bigint, p_skin_id int)
returns jsonb
language plpgsql
security definer
as $$
declare
  v_price int;
  v_days int;
  v_bal int;
  v_discount int := 0;
  v_final_price int;
  v_cur_exp timestamptz;
  v_new_exp timestamptz;
  v_now timestamptz := now();
begin
  -- 原版皮肤免费，无需购买
  if p_skin_id = 0 then
    return jsonb_build_object('ok', false, 'message', '原版皮肤免费使用');
  end if;

  -- 取价格（缺省 100 币 / 30 天）
  select price, duration_days into v_price, v_days
  from skin_prices where skin_id = p_skin_id;
  if v_price is null then
    v_price := 100; v_days := 30;
  end if;

  -- 计算生效中的活动折扣（取最新一条）
  select coalesce(discount, 0) into v_discount
  from shop_activities
  where active = true
    and (start_at is null or start_at <= v_now)
    and (end_at is null or end_at >= v_now)
  order by created_at desc
  limit 1;
  if v_discount is null then v_discount := 0; end if;

  -- 折扣为几折（如 8 折 = 原价 * 8 / 10），四舍五入，最低 1 币
  if v_discount > 0 and v_discount < 10 then
    v_final_price := greatest(1, round(v_price * v_discount / 10.0)::int);
  else
    v_final_price := v_price;
  end if;

  -- 锁定用户行，读取余额（FOR UPDATE 防止并发读-改-写覆盖）
  select coins into v_bal from users where id = p_user_id for update;
  if v_bal is null then
    return jsonb_build_object('ok', false, 'message', '用户不存在');
  end if;

  -- 余额校验
  if v_bal < v_final_price then
    return jsonb_build_object('ok', false, 'message', '小七币不足，还差 ' || (v_final_price - v_bal) || ' 币');
  end if;

  -- 计算新到期时间：未过期则从原到期日续期，否则从今天开始
  select max(expire_at) into v_cur_exp
  from skin_purchases
  where user_id = p_user_id and skin_id = p_skin_id and expire_at > v_now;
  if v_cur_exp is null then v_cur_exp := v_now; end if;
  v_new_exp := v_cur_exp + (v_days || ' days')::interval;

  -- 扣币
  update users set coins = coins - v_final_price where id = p_user_id;

  -- 写购买记录
  insert into skin_purchases (user_id, skin_id, price, expire_at)
  values (p_user_id, p_skin_id, v_final_price, v_new_exp);

  return jsonb_build_object(
    'ok', true,
    'message', '购买成功',
    'paid', v_final_price,
    'balance', v_bal - v_final_price,
    'expire_at', v_new_exp
  );
end;
$$;

-- 允许前端（anon / authenticated）调用该函数
grant execute on function buy_skin(bigint, int) to anon, authenticated;
