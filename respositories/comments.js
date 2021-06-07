const {Comment} = require('../models');

module.exports ={
    getAllComments() {
        return Comment.findAll();
    },
    getComments(offset = 0, limit = 10){
       return Comment.findAll({ offset: offset, limit: limit});

    },
    getComment(id) {
        return Comment.findAll({
            where:{
                id: id
            }
        });
    },
    getCommentByArticleId(ArticleId) {
        return Comment.findAll({
            where: {
                ArticleId: ArticleId
            }
        });
    },
    addComment(Comment) {
        Comment.create(Comment);
    },
    updateComment(id, Comment) {
        Comment.update(Comment, {
            where: {
                id: id
            }
        });
    },
    deleteComment(id) {
        Comment.destroy({
            where: {
                id: id
            }
        })
    },
}