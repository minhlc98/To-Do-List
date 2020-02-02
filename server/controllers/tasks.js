const { Task } = require('../models/db')


module.exports = {
    async getTasks(req, res) {
        const { userId } = req.query
        const tasks = await Task.find({ userId }, { __v: 0 }).lean()
        res.send(tasks)
    },
    async addTask(req, res) {
        const { userId, title } = req.body
        const task = Task({
            userId,
            title
        })
        const addTask = await task.save()
        res.send(addTask)
    },
    async deleteTask(req, res) {
        const { taskId } = req.params
        try {
            const deleteTask = await Task.deleteOne({ _id: taskId })
            res.send(deleteTask)
        } catch (err) {
            res.status(404).json({
                errMessage: 'Something went wrong. Please check again.'
            })
        }
    },
    async deleteAllTasks(req, res) {
        const { userId } = req.body
        const deleteAll = await Task.deleteMany({ userId })
        res.send(deleteAll)
    },
    async editTask(req, res) {
        const { body } = req
        const editTask = await Task.updateOne(
            { _id: body._id },
            {
                $set: {
                    title: body.title
                }
            }
        )
        const { nModified } = editTask
        if (nModified === 0) {
            res.status(404).json({
                errMessage: 'This task doesn\'t exist. Please check again'
            })
        }
        res.send(editTask)
    }
}