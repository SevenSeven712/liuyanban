-- ============================================================
-- 用户气泡皮肤字段 + 购买自动装备
-- 在 Supabase SQL Editor 中执行
-- ============================================================

-- 1) users 表新增"当前装备的气泡皮肤"字段，0 = 原版
alter table users add column if not exists bubble_skin int not null default 0;

-- 2) 更新原子购买函数：购买成功后自动装备该皮肤
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
  if p_skin_id = 0 then
    return jsonb_build_object('ok', false, 'message', '原版皮肤免费使用');
  end if;

  select price, duration_days into v_price, v_days
  from skin_prices where skin_id = p_skin_id;
  if v_price is null then
    v_price := 100; v_days := 30;
  end if;

  select coalesce(discount, 0) into v_discount
  from shop_activities
  where active = true
    and (start_at is null or start_at <= v_now)
    and (end_at is null or end_at >= v_now)
  order by created_at desc
  limit 1;
  if v_discount is null then v_discount := 0; end if;

  if v_discount > 0 and v_discount < 10 then
    v_final_price := greatest(1, round(v_price * v_discount / 10.0)::int);
  else
    v_final_price := v_price;
  end if;

  select coins into v_bal from users where id = p_user_id for update;
  if v_bal is null then
    return jsonb_build_object('ok', false, 'message', '用户不存在');
  end if;

  if v_bal < v_final_price then
    return jsonb_build_object('ok', false, 'message', '小七币不足，还差 ' || (v_final_price - v_bal) || ' 币');
  end if;

  select max(expire_at) into v_cur_exp
  from skin_purchases
  where user_id = p_user_id and skin_id = p_skin_id and expire_at > v_now;
  if v_cur_exp is null then v_cur_exp := v_now; end if;
  v_new_exp := v_cur_exp + (v_days || ' days')::interval;

  update users set coins = coins - v_final_price, bubble_skin = p_skin_id where id = p_user_id;

  insert into skin_purchases (user_id, skin_id, price, expire_at)
  values (p_user_id, p_skin_id, v_final_price, v_new_exp);

  return jsonb_build_object(
    'ok', true,
    'message', '购买成功',
    'paid', v_final_price,
    'balance', v_bal - v_final_price,
    'expire_at', v_new_exp,
    'bubble_skin', p_skin_id
  );
end;
$$;

grant execute on function buy_skin(bigint, int) to anon, authenticated;

-- 3) 新增"装备皮肤"函数（用户手动切换已拥有的皮肤 / 换回原版）
create or replace function equip_skin(p_user_id bigint, p_skin_id int)
returns jsonb
language plpgsql
security definer
as $$
declare
  v_owned boolean;
  v_now timestamptz := now();
begin
  if p_skin_id = 0 then
    update users set bubble_skin = 0 where id = p_user_id;
    return jsonb_build_object('ok', true, 'bubble_skin', 0);
  end if;

  select exists(
    select 1 from skin_purchases
    where user_id = p_user_id and skin_id = p_skin_id and expire_at > v_now
  ) into v_owned;

  if not v_owned then
    return jsonb_build_object('ok', false, 'message', '尚未拥有该皮肤或已过期');
  end if;

  update users set bubble_skin = p_skin_id where id = p_user_id;
  return jsonb_build_object('ok', true, 'bubble_skin', p_skin_id);
end;
$$;

grant execute on function equip_skin(bigint, int) to anon, authenticated;
