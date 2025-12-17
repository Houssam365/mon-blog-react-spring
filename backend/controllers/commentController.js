const Comment = require('../models/Comment');
const Article = require('../models/Article');

// Ajouter un commentaire
exports.addComment = async (req, res) => {
    try {
        const { content, articleId } = req.body;

        // Vérifier si l'article existe
        const article = await Article.findById(articleId);
        if (!article) {
            return res.status(404).json({ message: 'Article non trouvé.' });
        }

        const comment = new Comment({
            content,
            article: articleId,
            author: req.user.userId
        });

        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'ajout du commentaire.', error: error.message });
    }
};

// Récupérer les commentaires d'un article
exports.getCommentsByArticle = async (req, res) => {
    try {
        const comments = await Comment.find({ article: req.params.articleId }).populate('author', 'username').sort({ createdAt: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des commentaires.', error: error.message });
    }
}

// Récupérer les commentaires d'un auteur
exports.getCommentsByAuthor = async (req, res) => {
    try {
        const comments = await Comment.find({ author: req.params.userId })
            .populate('article', 'title')
            .sort({ createdAt: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des commentaires de l\'utilisateur.', error: error.message });
    }
};

// Supprimer un commentaire
exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: 'Commentaire non trouvé.' });
        }

        // Vérifier que l'utilisateur est l'auteur
        if (comment.author.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Non autorisé.' });
        }

        await Comment.deleteOne({ _id: comment._id });
        res.json({ message: 'Commentaire supprimé.' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du commentaire.', error: error.message });
    }
};
