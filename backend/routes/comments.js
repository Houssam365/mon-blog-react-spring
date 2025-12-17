const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');

// Routes publiques (optionnel, sinon protégées)
router.get('/article/:articleId', commentController.getCommentsByArticle);
router.get('/author/:userId', commentController.getCommentsByAuthor);

// Routes protégées
router.post('/', auth, commentController.addComment);
router.delete('/:id', auth, commentController.deleteComment);

module.exports = router;
