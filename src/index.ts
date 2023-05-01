#!/usr/bin/env ts-node

import cors from 'cors'
import express, { Request, Response } from 'express'
import * as fs from 'fs'
import http from 'http'
import path from 'path'
import { Server } from 'socket.io'
import sqlite3 from 'sqlite3'
import { v4 as uuidv4 } from 'uuid'

// initialize
const { verbose } = sqlite3
const db = new (verbose().Database)(':memory:')

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

app.use(cors())
app.use(express.static(path.join(__dirname + '/front/build')))

// setup sql tables
const sql = fs.readFileSync(path.join(__dirname + '/chat.sql')).toString()
db.exec(sql, (err) => {
    if (err) {
        console.error('Error executing SQL file:', err)
    } else {
        console.log('SQL file executed successfully.')
    }
})

// Serve home.html as the root page
app.get('/', (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '/front/build', 'index.html'))
})
app.get('/chat/:chatId', (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '/front/build', 'index.html'))
})

app.get('/api/rooms', (_req: Request, res: Response) => {
    try {
        db.all('SELECT * FROM rooms', (err, rows) => {
            if (err) {
                console.error(err)
                res.sendStatus(500)
            } else {
                res.json(rows)
            }
        })
    } catch (error) {
        res.sendStatus(500)
    }
})

app.post('/api/rooms', async (req: Request, res: Response) => {
    try {
        const name = (req.query.name as string).trim()

        if (!name) {
            res.sendStatus(400)
            return
        }

        const id = uuidv4()

        db.run('INSERT INTO rooms (_id, name) VALUES (?, ?)', id, name)

        res.json({ result: id })
    } catch (error) {
        res.sendStatus(500)
    }
})

io.on('connection', (socket) => {
    socket.on('message', (data) => {
        const { username, message, room_id } = data

        db.run(
            'INSERT INTO messages (room_id, user_name, message) VALUES (?, ?, ?)',
            room_id,
            username,
            message,
            (err: Error) => {
                if (err) {
                    console.error(err)
                } else {
                    io.emit('messages-' + room_id, { username, message })
                }
            }
        )
    })
    // Обработчик события 'connection'
    socket.on('connection', () => {
        console.log('Пользователь подключился')
    })
    // Обработчик события 'disconnect'
    socket.on('disconnect', () => {
        console.log('Пользователь отключился')
    })
})

const port = process.env.PORT || 3000
server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
