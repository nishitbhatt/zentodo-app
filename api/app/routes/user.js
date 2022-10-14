import express from 'express'
const UserRoutes = express.Router()

UserRoutes.get('/', (req, res) => {
    return res.json({ data: "USER User API Index QQQQQQQQQQQ123123" })
})

UserRoutes.get('/test', (req, res) => {
    return res.json({ key: "USER Test API" })
})

UserRoutes.post('/authenticate', (req, res) => {

    const { username, password } = req.body
    let status = 404

    if (username === 'nishit@gmail.com' && password === '123') {
        status = 200
    }

    return res.json({ status })
})

export default UserRoutes