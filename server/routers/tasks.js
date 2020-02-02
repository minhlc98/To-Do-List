const express = require('express')
const router = express.Router()
const taskController = require('../controllers/tasks')

router.use(require('../controllers/verify-token'))

router.get('/', taskController.getTasks)
router.post('/', taskController.addTask)
router.delete('/:taskId', taskController.deleteTask)
router.delete('/', taskController.deleteAllTasks)
router.put('/:taskId', taskController.editTask)
module.exports = router