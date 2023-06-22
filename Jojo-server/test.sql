select *
from message
    join(
        select room_id,
            max(created_at) as last_message_date
        from message
        group by room_id
    ) last_message on message.room_id = last_message.room_id
    and last_message.last_message_date = message.created_at
select *
from chatroom
    join public.user on chatroom.creator_id = public.user.id
where chatroom.id = 4
select *
from chatroom
    join user on chatroom.receiver_id = public.user.id
where chatroom.id = 4