const {Tag} = require('../models');
module.exports = {
    getAllTags() {
        return Tag.findAll();
    },
    getTags(offset=0, limit=10) {
        return Tag.findAll({offset: offset, limit: limit});
    },

    getTag(id) {
        return Tag.findAll({
            where:{
                id: id
            }
        });
    },
    addTag(tag) {
        Tag.create(tag);
    },
    updateTag(id, tag) {
        Tag.update(tag, {
            where: {
                id: id
            }
        });
    },
    deleteTag(id) {
        Tag.destroy({
            where: {
                id: id
            }
        })
    },
}