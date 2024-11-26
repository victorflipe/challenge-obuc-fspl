const { Router } = require('express');
const taskController = require('../controllers/taskController');

const router = Router();

router.route('/tasks')
    .get(taskController.getAllTasks)
    .post(taskController.createTask)

router.route('/tasks/:id')
    .get(taskController.getTaskById)
    .patch(taskController.updateTask)
    .delete(taskController.deleteTask)


router.route('/tasks/:id/tags')
    .post(taskController.addTagsToTask)
    .put(taskController.updateTagsForTask);

router.route('/tasks-user/:assignedTo')
    .get(taskController.getTasksByUser)


module.exports = router;
