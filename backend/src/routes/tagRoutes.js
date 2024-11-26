const { Router } = require('express');
const tagController = require('../controllers/tagController');

const router = Router();

router.route('/tags')
    .get(tagController.getAllTags)
    .post(tagController.createTag)

router.route('/tags/:id')
    .get(tagController.getTagById)
    .patch(tagController.updateTag)
    .delete(tagController.deleteTag)

module.exports = router;
