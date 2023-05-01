import { TRoom } from './types'

const getRooms = async (): Promise<TRoom> => {
    const response = await fetch('/api/rooms')
    const data = await response.json()
    return data
}

const createRoom = async (name: string) => {
    const response = await fetch('/api/rooms?name=' + name, { method: 'POST' })
    const data = await response.json()
    return data
}

export { getRooms, createRoom }
