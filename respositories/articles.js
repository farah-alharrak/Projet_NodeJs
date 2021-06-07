const { Article } = require('../models');

module.exports = {
    getAllArticles() {
        return Article.findAll();
    },
    getArticles(offset=0, limit=10) {
        return Article.findAll({
             offset: offset,
             limit: limit
            });
    },
    getArticlesByTitle(title) {
        return Article.findAll({
            where: {title: title}
        });
    },
    getArticle(id) {
        return Article.findAll({
            where:{id: id}
        });
    },
    getArticleByUserId(UserId) {
        return Article.findAll({
            where: {UserId: UserId}
        });
    },
    addArticle(article) {
        Article.create(article);
    },
    updateArticle(id, article) {
        Article.update(article, {
            where: {id: id}
        });
    },
    deleteArticle(id) {
        Article.destroy({
            where: {id: id}
        })
    },
}