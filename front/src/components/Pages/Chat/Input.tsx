import SendIcon from '@mui/icons-material/Send'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import React from 'react'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'

const socket = io()

const Input = () => {
    const [message, setMessage] = React.useState('')
    const { chatId } = useParams()

    const onClick = () => {
        const text = message.trim()
        if (!text) return
        socket.emit('message', {
            message: text,
            username: window.username || 'Anonim',
            room_id: chatId,
        })
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <TextField
                variant="outlined"
                placeholder="Привет Володя)"
                sx={{ width: '100%' }}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            />
            <Button variant="contained" sx={{ marginLeft: 1 }} onClick={onClick}>
                <SendIcon />
            </Button>
        </Box>
    )
}

export default Input
