export let server_origin = 'http://localhost:3000'

let api_origin = 'http://localhost:3000/api'

let store = typeof window == 'undefined' ? null : localStorage

let token = store?.getItem('token')?.replace(/"/g, '') || null

export function getToken() {
  return token
}

export function clearToken() {
  token = null
  store?.removeItem('token')
}

function post(url: string, body: object, token_?: string) {
  return fetch(api_origin + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token_,
    },
    body: JSON.stringify(body),
  })
    .then(res => res.json())
    .catch(err => ({ error: String(err) }))
    .then(json => {
      if (json.error) {
        return Promise.reject(json.error)
      }
      if (json.token) {
        token = json.token as string
        store?.setItem('token', JSON.stringify(token))
      }
      return json
    })
}

export type GreetInput = {
  name: string
}
export type GreetOutput = {
  message: string
}
export function greet(
  input: GreetInput,
): Promise<GreetOutput & { error?: string }> {
  return post('/greet', input)
}

export type RegisterInput = {
  username: string
  password: string
}
export type RegisterOutput = {
  token: string
}
export function register(
  input: RegisterInput,
): Promise<RegisterOutput & { error?: string }> {
  return post('/register', input)
}

export type LoginInput = {
  username: string
  password: string
}
export type LoginOutput = {
  token: string
}
export function login(
  input: LoginInput,
): Promise<LoginOutput & { error?: string }> {
  return post('/login', input)
}

export type GetUserListInput = {}
export type GetUserListOutput = {
  users: Array<{
    id: number
    username: string
    is_admin: boolean
  }>
}
export function getUserList(
  input: GetUserListInput,
): Promise<GetUserListOutput & { error?: string }> {
  return post('/getUserList', input)
}

export type GetRecentLogsInput = {
  limit: number
  last_log_id: number
  username: string
}
export type GetRecentLogsOutput = {
  users: Array<{
    id: number
    user_id: number
    username: string
    timestamp: string
    rpc: string
    input: string
  }>
  remains: number
}
export function getRecentLogs(
  input: GetRecentLogsInput & { token: string },
): Promise<GetRecentLogsOutput & { error?: string }> {
  let { token, ...body } = input
  return post('/getRecentLogs', body, token)
}

export type GetRoomListInput = {}
export type GetRoomListOutput = {
  rooms: Array<{
    id: number
    title: string
    created_by: string
    user_id: number
  }>
}
export function getRoomList(
  input: GetRoomListInput & { token: string },
): Promise<GetRoomListOutput & { error?: string }> {
  let { token, ...body } = input
  return post('/getRoomList', body, token)
}

export type CreateNewRoomInput = {
  title: string
}
export type CreateNewRoomOutput = {
  id: number
  user_id: number
  created_by: string
}
export function createNewRoom(
  input: CreateNewRoomInput & { token: string },
): Promise<CreateNewRoomOutput & { error?: string }> {
  let { token, ...body } = input
  return post('/createNewRoom', body, token)
}

export type GetRoomDetailInput = {
  room_id: number
}
export type GetRoomDetailOutput = {
  room: {
    title: string
    creator: {
      id: number
      username: string
    }
    canDelete: boolean
    messages: Array<{
      id: number
      sender: {
        id: number
        username: string
      }
      content: string
      sent_time: number
    }>
  }
}
export function getRoomDetail(
  input: GetRoomDetailInput & { token: string },
): Promise<GetRoomDetailOutput & { error?: string }> {
  let { token, ...body } = input
  return post('/getRoomDetail', body, token)
}

export type SendMessageToRoomInput = {
  room_id: number
  content: string
}
export type SendMessageToRoomOutput = {
  id: number
}
export function sendMessageToRoom(
  input: SendMessageToRoomInput & { token: string },
): Promise<SendMessageToRoomOutput & { error?: string }> {
  let { token, ...body } = input
  return post('/sendMessageToRoom', body, token)
}

export type GetSelfProfileInput = {}
export type GetSelfProfileOutput = {
  profile: {
    id: number
    username: string
    avatar: null | string
  }
}
export function getSelfProfile(
  input: GetSelfProfileInput & { token: string },
): Promise<GetSelfProfileOutput & { error?: string }> {
  let { token, ...body } = input
  return post('/getSelfProfile', body, token)
}

export type ChangeAvatarInput = {
  filename: string
}
export type ChangeAvatarOutput = {}
export function changeAvatar(
  input: ChangeAvatarInput & { token: string },
): Promise<ChangeAvatarOutput & { error?: string }> {
  let { token, ...body } = input
  return post('/changeAvatar', body, token)
}

export type DemoInput = {}
export type DemoOutput = {}
export function demo(
  input: DemoInput,
): Promise<DemoOutput & { error?: string }> {
  return post('/demo', input)
}
