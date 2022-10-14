import TasksModel from "../models/Tasks.model"


export const getAllTasks = async (req, res) => {
    let status, message, data;
    try {
        const allTodos = await TasksModel.find();
        if (allTodos) {
            status = 200;
            message = "Recored Found!";
            data = allTodos;
        }
    } catch (error) {
        status = 404;
        message = "Error : " + error;
        data = null;
    }
    return res.status(status).json({ status, message, data });
}

export const createTask = async (req, res) => {
    let status;
    let message;
    let data = [];

    if (req.body.NewTaskTitle) {

        try {
            const newTask = new TasksModel({
                "title": req.body.NewTaskTitle,
                "description": req.body.NewTaskDescription,
                "duedate": req.body.NewTaskDueDate,
                "completed": req.body.NewTaskCompleted,
                "sectionid": req.body.NewTaskSection,
                "tagsid": 'tags1231231'
            });
            const taskInserted = await newTask.save();
            if (taskInserted) {
                status = 200;
                message = "Recored Created!";
                data = newTask;
            }
        } catch (error) {
            status = 404;
            message = 'Error : ' + error;
        }
    } else {
        status = 404;
        message = "No title given";
    }
    return res.status(status).json({ status, message, data });
}

export const updateTask = async (req, res) => {
    let status, message, data;
    await TasksModel.findByIdAndUpdate(req.body.TaskId,
        {
            "title": req.body.TaskTitle,
            "description": req.body.TaskDescription,
            "duedate": req.body.TaskDueDate,
            "completed": req.body.TaskCompleted,
            "sectionid": req.body.TaskSectionId
        },
    ).then((TaskRecord) => {
        if (TaskRecord) {
            status = 200;
            message = "Task updated " + req.body.TaskId;
            data = TaskRecord;
        } else {
            status = 404;
            message = "Task not found with id " + req.body.TaskId;
        }
        return res.status(status).json({ status, message, data });
    }).catch((err) => {
        if (err.kind === "ObjectId") {
            status = 404;
            message = "Task not found with id " + req.body.TaskId;
        } else {
            status = 500;
            message = "Error updating Task with id " + req.body.TaskId;
        }
        return res.status(status).json({ status, message, data });
    });
}

export const completeTask = (req, res) => {
    let status, message, data;
    TasksModel.findByIdAndUpdate(req.params.taskid,
        {
            completed: true
        },
    ).then((TodoRecord) => {
        if (TodoRecord) {
            status = 200;
            message = "Task updated " + req.params.taskid;
            data = TodoRecord;
        } else {
            status = 404;
            message = "Task not found with id " + req.params.taskid;
        }
        return res.status(status).json({ status, message, data });
    }).catch((err) => {
        if (err.kind === "ObjectId") {
            status = 404;
            message = "Task not found with id " + req.params.taskid;
        } else {
            status = 500;
            message = "Error updating Task with id " + req.params.taskid;
        }
        return res.status(status).json({ status, message, data });
    });
}

export const deleteTask = async (req, res) => {
    let status, message, data;
    const TaskRecord = await TasksModel.findByIdAndRemove(req.params.taskid)
    if (TaskRecord) {
        data = TaskRecord;
        status = 200;
        message = "Task Deleted " + req.params.taskid;
        return res.status(status).json({ status, message, data });
    } else {
        status = 404;
        message = "Something went wrong! " + req.params.taskid;
    }
    return res.status(status).json({ status, message, data });
}

export const uncompleteTask = (req, res) => {
    let status, message, data;
    TasksModel.findByIdAndUpdate(req.params.taskid,
        {
            completed: false
        },
    ).then((TodoRecord) => {
        if (TodoRecord) {
            status = 200;
            message = "Task updated " + req.params.taskid;
            data = TodoRecord;
        } else {
            status = 404;
            message = "Task not found with id " + req.params.taskid;
        }
        return res.status(status).json({ status, message, data });
    }).catch((err) => {
        if (err.kind === "ObjectId") {
            status = 404;
            message = "Task not found with id " + req.params.taskid;
        } else {
            status = 500;
            message = "Error updating Task with id " + req.params.taskid;
        }
        return res.status(status).json({ status, message, data });
    });
}

export const getTask = async (req, res) => {
    let status, message, data;
    try {
        const TaskRecord = await TasksModel.findById(req.params.taskid)
        if (TaskRecord) {
            status = 200;
            message = "Task updated " + req.params.taskid;
            data = TaskRecord;
        } else {
            status = 404;
            message = "Task Not Found " + req.params.taskid;
        }
    } catch (err) {
        console.log('error', err)
        return res.status(200).json({ asd: "asdads" });
    }
    return res.status(status).json({ status, message, data });
}

// Demo Method
export const test = (req, res) => {
    return res.json({ data: "This is task test API" })
}