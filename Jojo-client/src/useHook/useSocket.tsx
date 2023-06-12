import { io } from 'socket.io-client'
import { useEffect, useMemo, useState } from 'react'
import { server_origin } from '../sdk'

type Socket = ReturnType<typeof io>

let x = 0

export function useSocket() {
  // const client = useMemo(() => {
  //   let client = io(server_origin.replace('http', 'ws'))
  //   return client
  // }, [])

  const [client, setClient] = useState<Socket | null>(null)

  useEffect(() => {
    x++
    console.log('open ws', x)
    let client = io(server_origin.replace('http', 'ws'))
    setClient(client)
    return () => {
      x++
      console.log('close ws', x)
      client.close()
    }
  }, [])

  return client
}
