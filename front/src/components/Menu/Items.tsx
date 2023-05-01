import styled from '@emotion/styled'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import React from 'react'
import { Link } from 'react-router-dom'
import { createRoom, getRooms } from '../../api/api'
import { TRoom } from '../../api/types'

const BootstrapButton = styled(Button)({ margin: 10 })

const RouterItems = () => {
    const [rooms, setRooms] = React.useState<Array<TRoom>>([])
    const [chatName, setChatName] = React.useState('')

    const loadRooms = () =>
        getRooms().then(
            (data) => Array.isArray(data) && data.length && setRooms(data),
            (error) => console.error(error)
        )

    React.useEffect(() => {
        loadRooms()
    }, [])

    const HCreateChat = async () => {
        await createRoom(chatName)

        loadRooms()
    }

    return (
        <>
            <Box sx={{ display: 'flex', pt: 2, pb: 2, pl: 1, alignItems: 'center' }}>
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    placeholder="Название чата"
                    onChange={(e) => setChatName(e.target.value)}
                    value={chatName}
                />
                <BootstrapButton variant="contained" onClick={HCreateChat}>
                    <AddIcon />
                </BootstrapButton>
            </Box>
            <Divider />
            <List>
                {rooms ? (
                    rooms.map((room, index) => (
                        <Link to={'chat/' + room._id} key={index}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemText
                                        style={{ color: '#000000DE' }}
                                        primary={room.name}
                                    />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))
                ) : (
                    <></>
                )}
            </List>
        </>
    )
}

export default React.memo(RouterItems)
