import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import React from 'react'
import Items from './Items'

const drawerWidth = 240

const MenuPanel = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false)

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

    return (
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                <Items />
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                <Items />
            </Drawer>
        </Box>
    )
}

export default MenuPanel
