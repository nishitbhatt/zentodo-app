import express from 'express'
import { getAllTasks, createTask, uncompleteTask, completeTask, getTask, updateTask, deleteTask } from "../controllers/Tasks.controller"


const TaskRoutes = express.Router()


TaskRoutes.get('/', (req, res) => {
    return res.json({ data: "TaskRoutes QQQQQQQQQQQ123123" })
})
TaskRoutes.get('/test', (req, res) => {
    return res.json({ data: "Task Test Route" })
})

TaskRoutes.get('/all', getAllTasks)
TaskRoutes.get('/:taskid', getTask)

TaskRoutes.post('/create', createTask)
TaskRoutes.post('/update', updateTask)

TaskRoutes.get('/:taskid/complete', completeTask)
TaskRoutes.get('/:taskid/uncomplete', uncompleteTask)
TaskRoutes.get('/:taskid/delete', deleteTask)



export default TaskRoutes