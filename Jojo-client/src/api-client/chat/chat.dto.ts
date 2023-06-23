export type RoomListItem = {
    id: number
    username: string
    last_message: string | null
}

export type RoomDetail = {
    id: number
    username: string
    messages: string[]
}