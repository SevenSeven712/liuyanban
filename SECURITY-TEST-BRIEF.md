# 社区网站 · 网络安全测试说明

## 一、项目背景

一个基于 **Supabase** 的社区网站（前端纯静态 HTML/JS，部署在 GitHub Pages）。

- 线上地址：https://sevenseven712.github.io/liuyanban/
- 后端：Supabase（Postgres + Auth + RLS + RPC）
- 前端：原生 HTML/CSS/JS，无框架
- 认证方式：手机号映射为虚拟邮箱（`手机号@sq.local`）走 Supabase Auth

主要页面：index.html（登录注册）、posts.html（帖子广场）、activity.html（活动/领币）、shop.html（皮肤商店）、room.html（房间/红包）、chats.html、messages.html、profile.html、user.html、new-post.html

## 二、数据库结构（关键表）

- `users`：用户资料（含 coins 余额、is_admin 管理员标记、auth_id）
- `user_roles`：角色
- `posts` / `post_comments` / `post_polls` / `poll_options` / `poll_votes`
- `coin_transactions`：小七币流水
- `red_packets` / `red_packet_grabs`：红包
- `skin_prices` / `skin_purchases` / `shop_activities`：皮肤商店
- `bubble_gift_claims`：限时气泡领取
- `messages` / `chats` / `room_messages` / `rooms`
- `reports` / `feedback` / `notifications` / `follows` / `device_registrations`

## 三、RPC 函数（重点测试对象）

所有函数都基于 `auth.uid()` 判断调用者身份，不再信任前端传参：

- `claim_daily_bonus()`：每日登录奖励
- `buy_skin(p_skin_id)`：购买皮肤
- `equip_skin(p_skin_id)`：装备皮肤
- `claim_bubble_gift(p_skin_id)`：领取限时气泡
- `send_red_packet(...)` / `grab_red_packet(p_packet_id)`：红包
- `admin_adjust_coins(p_target_user_id, p_amount, p_reason)`：管理员调币（需 is_admin）
- `admin_ban_user` / `admin_unban_user` / `admin_set_role` / `admin_remove_role`：管理员操作（需 is_admin）

## 四、已修复的历史漏洞（供参考，请验证是否真的修好）

之前存在严重问题，已做修复：

1. **RPC 信任前端传参**：旧版函数接受 `p_user_id` 参数，任何人都能操作任意用户（刷币、提权）。现已改为从 `auth.uid()` 取当前用户。
2. **RLS 全开**：`users`、`user_roles` 等表曾是 `Allow all` 策略，任何人可读可写。现已收紧。
3. **管理员手机号硬编码**：前端和 SQL 里写死了管理员手机号。现已改为 `users.is_admin` 字段。
4. **前端信任 localStorage**：`getSessionUser()` 直接读浏览器缓存当身份，可被篡改。部分依赖 Supabase Auth 真实会话校验。

**请重点验证以上四点是否真的无法利用。**

## 五、测试目标

1. 能否**未授权**读取/修改他人数据（尤其是 users 表手机号、coins、角色）
2. 能否**绕过** `is_admin()` 校验，调用管理员 RPC
3. 能否**给自己刷币**、刷皮肤、刷红包
4. 能否**提权**（把自己变成管理员）
5. 能否**冒充他人身份**（改 localStorage、伪造请求）
6. 能否**越权删除/修改**帖子、评论、消息
7. Supabase anon key 已在源码中公开（这是设计如此），请评估**仅凭 anon key 能做什么**

## 六、注意事项

- **仅做授权测试**，不要进行破坏性操作（不要批量删数据、不要 DoS）
- **不要泄露**真实的用户手机号、密码等隐私数据
- 所有测试结论请**附上复现步骤**（在哪个页面、控制台执行什么、返回什么）
- 管理员账号信息不会提供，测试请以普通用户身份进行
- 数据库连接信息不会提供，测试请从**前端可达的接口**入手

## 七、输出要求

请按以下格式给出报告：

1. **漏洞清单**：每条含【严重级别】【复现步骤】【实际结果】【影响】【修复建议】
2. **已验证安全**的部分：列出你尝试但未成功的攻击面
3. **总体评价**：当前安全水位如何
