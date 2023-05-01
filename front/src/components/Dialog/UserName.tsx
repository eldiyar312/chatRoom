import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import * as React from 'react'

const UserNameDialog = () => {
    const [open, setOpen] = React.useState(true)
    const [name, setName] = React.useState('')

    const handleClose = () => {
        const str = name.trim()
        if (!str) return
        setOpen(false)
        window.username = str
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Как вас зовут ?</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Никнейм"
                    type="email"
                    fullWidth
                    variant="standard"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Подтвердить</Button>
            </DialogActions>
        </Dialog>
    )
}

export default UserNameDialog
