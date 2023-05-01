import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import React from 'react'

interface Props {
    name: string
    text: string
}

const Message = ({ name, text }: Props) => {
    return (
        <Card sx={{ minWidth: 100, minHeight: 70, mb: 2, borderRadius: 5 }} elevation={3}>
            <CardContent sx={{ pb: '12px !important' }}>
                <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                    {name}
                </Typography>
                <Typography variant="body2">{text}</Typography>
            </CardContent>
        </Card>
    )
}

export default React.memo(Message)
