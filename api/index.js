import { app } from "./app/config/server"
import { UserRoutes, TaskRoutes, SectionRoutes} from "./app/routes"

// import UserRoutes from "./app/routes/user"
// import { TaskRoutes, UserRoutes, CustomRoutes } from './app/routes'


// app.use('/zzz', CustomRoutes)
// app.use('/tasks', TaskRoutes)
// app.use('/user', UserRoutes)


// app.get('/tasks', (req, res) => {
//     return res.json({ key: '/tasks' })
// })



app.use('/tasks', TaskRoutes)
app.use('/user', UserRoutes)
app.use('/section', SectionRoutes)


// app.get('/custom', (req, res) => {
//     return res.json({ key: '/custom' })
// })

// app.all('*', (req, res) => {

//     return res.json({ route: 'NOT FOUND' })
// })


export default app