#!/usr/bin/env ts-node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const fs = __importStar(require("fs"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const sqlite3_1 = __importDefault(require("sqlite3"));
const uuid_1 = require("uuid");
// initialize
const { verbose } = sqlite3_1.default;
const db = new (verbose().Database)(':memory:');
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, { cors: { origin: '*' } });
app.use((0, cors_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname + '/front/build')));
// setup sql tables
const sql = fs.readFileSync(path_1.default.join(__dirname + '/chat.sql')).toString();
db.exec(sql, (err) => {
    if (err) {
        console.error('Error executing SQL file:', err);
    }
    else {
        console.log('SQL file executed successfully.');
    }
});
// Serve home.html as the root page
app.get('/', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname + '/front/build', 'index.html'));
});
app.get('/chat/:chatId', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname + '/front/build', 'index.html'));
});
app.get('/api/rooms', (_req, res) => {
    try {
        db.all('SELECT * FROM rooms', (err, rows) => {
            if (err) {
                console.error(err);
                res.sendStatus(500);
            }
            else {
                res.json(rows);
            }
        });
    }
    catch (error) {
        res.sendStatus(500);
    }
});
app.post('/api/rooms', async (req, res) => {
    try {
        const name = req.query.name.trim();
        if (!name) {
            res.sendStatus(400);
            return;
        }
        const id = (0, uuid_1.v4)();
        db.run('INSERT INTO rooms (_id, name) VALUES (?, ?)', id, name);
        res.json({ result: id });
    }
    catch (error) {
        res.sendStatus(500);
    }
});
io.on('connection', (socket) => {
    socket.on('message', (data) => {
        const { username, message, room_id } = data;
        db.run('INSERT INTO messages (room_id, user_name, message) VALUES (?, ?, ?)', room_id, username, message, (err) => {
            if (err) {
                console.error(err);
            }
            else {
                io.emit('messages-' + room_id, { username, message });
            }
        });
    });
    // Обработчик события 'connection'
    socket.on('connection', () => {
        console.log('Пользователь подключился');
    });
    // Обработчик события 'disconnect'
    socket.on('disconnect', () => {
        console.log('Пользователь отключился');
    });
});
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
