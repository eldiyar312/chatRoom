import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import MenuPanel from './Panel'

interface Props {
    children: JSX.Element
}

const Menu = (props: Props) => {
    return (
        <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
            <CssBaseline />
            <MenuPanel />
            {props.children}
        </Box>
    )
}

export default Menu
