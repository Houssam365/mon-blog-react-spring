const Article = require('../models/Article');
const Comment = require('../models/Comment');

// Récupérer tous les articles
exports.getAllArticles = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search) {
            const searchRegex = new RegExp(search, 'i');
            query = {
                $or: [
                    { title: searchRegex },
                    { tags: searchRegex }
                ]
            };
        }

        const articles = await Article.find(query).populate('author', 'username').sort({ createdAt: -1 });
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des articles.', error: error.message });
    }
};

// Créer un article
exports.createArticle = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const article = new Article({
            title,
            content,
            tags: tags || [],
            author: req.user.userId
        });
        await article.save();
        res.status(201).json(article);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'article.', error: error.message });
    }
};

// Récupérer un article par ID
exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id).populate('author', 'username');
        if (!article) {
            return res.status(404).json({ message: 'Article non trouvé.' });
        }
        res.json(article);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'article.', error: error.message });
    }
};

// Mettre à jour un article
exports.updateArticle = async (req, res) => {
    try {
        const { title, content } = req.body;
        let article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({ message: 'Article non trouvé.' });
        }

        // Vérifier que l'utilisateur est l'auteur
        if (article.author.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Non autorisé.' });
        }

        article.title = title || article.title;
        article.content = content || article.content;
        if (req.body.tags) {
            article.tags = req.body.tags;
        }

        await article.save();
        res.json(article);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'article.', error: error.message });
    }
};

// Supprimer un article
exports.deleteArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({ message: 'Article non trouvé.' });
        }

        // Vérifier que l'utilisateur est l'auteur
        console.log('Article Author:', article.author.toString());
        console.log('Request User ID:', req.user.userId);
        console.log('Match:', article.author.toString() === req.user.userId);

        if (article.author.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Non autorisé.' });
        }

        // Supprimer les commentaires associés
        await Comment.deleteMany({ article: article._id });

        await Article.deleteOne({ _id: article._id });
        res.json({ message: 'Article supprimé.' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'article.', error: error.message });
    }
};
