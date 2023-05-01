import Box from '@mui/material/Box'
import React from 'react'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'
import Message from './Message'

const socket = io()

type TMessage = {
    username: string
    message: string
}

const Messages = () => {
    const [messages, setMessages] = React.useState<Array<TMessage>>([])
    const [events, setEvents] = React.useState<Array<string>>([])
    const { chatId } = useParams()
    const mounted = React.useRef(false)

    React.useEffect(() => {
        // create even for listening channel
        const event = 'messages-' + chatId
        if (!events.includes(event)) {
            setEvents((prevData) => [...prevData, event])
            socket.on(event, (message: TMessage) => {
                setMessages((prevData) => [...prevData, message])
            })
        }
        // clean
        setMessages([])
        return () => {
            mounted.current = true
        }
    }, [chatId, events])

    return (
        <Box
            sx={{
                display: 'block',
                height: '100%',
                width: '100%',
            }}
        >
            <Box
                sx={{
                    pl: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                    height: '100%',
                    width: '100%',
                    overflow: 'auto',
                }}
            >
                {messages.length ? (
                    messages.map((message, index) => (
                        <Message key={index} name={message.username} text={message.message} />
                    ))
                ) : (
                    <></>
                )}
            </Box>
        </Box>
    )
}

export default React.memo(Messages)
