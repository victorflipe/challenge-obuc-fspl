const { Task, Tag } = require('../models');

const createTask = async (req, res) => {
    try {
        const { title, description, status, assignedTo } = req.body;

        const task = await Task.create({ title, description, status, assignedTo });

        return res.status(201).json(task);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ include: { model: Tag, through: { attributes: [] } } });

        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        if (task) {
            return res.status(200).json(task);
        } else {
            return res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getTasksByUser = async (req, res) => {
    try {
        const {assignedTo} = req.params;
        const tasks = await Task.findAll({ where: { assignedTo },  include: {model: Tag, through:{attribute:[]}}});

        if (tasks) {
            return res.status(200).json(tasks);
        } else {
            return res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const { title, description, status, assignedTo } = req.body;

        const task = await Task.findByPk(req.params.id);

        if (task) {
            await task.update({ title, description, status, assignedTo });

            await task.reload();

            return res.status(200).json(task);
        } else {
            return res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        if (task) {
            await task.destroy();

            return res.status(204).send();
        } else {
            return res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


const addTagsToTask = async (req, res) => {
    console.log('Post register');
    console.log(req)
    const { id } = req.params;
    const { tags } = req.body;

    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        await task.setTags(tags);

        return res.status(200).json({ message: 'Tags added successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}

const updateTagsForTask = async (req, res) => {
    console.log('Params received...');
    console.log(req);
    const { id } = req.params;
    const { tags } = req.body;

    try {
        console.log('Update Task');
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        await task.setTags(tags);

        return res.status(200).json({ message: 'Tags added successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}


module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    addTagsToTask,
    updateTagsForTask,
    getTasksByUser
}