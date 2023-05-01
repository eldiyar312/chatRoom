import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Menu from './components/Menu'
import Chat from './components/Pages/Chat'
import Home from './components/Pages/Home'

const AppRouter = () => {
    return (
        <Router>
            <Menu>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/chat/:chatId" element={<Chat />} />
                </Routes>
            </Menu>
        </Router>
    )
}

export default AppRouter
