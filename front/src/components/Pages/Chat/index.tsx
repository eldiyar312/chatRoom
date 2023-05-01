import Box from '@mui/material/Box'
import Input from './Input'
import Messages from './Messages'

const drawerWidth = 240

export default function Chat() {
    return (
        <Box
            component="div"
            sx={{
                p: 2,
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                height: '100vh',
                justifyContent: 'space-between',
                flexDirection: 'column',
                display: 'flex',
            }}
        >
            <Messages />
            <Input />
        </Box>
    )
}
