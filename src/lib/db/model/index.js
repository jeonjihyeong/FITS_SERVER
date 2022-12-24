const user = require('./user');
const note = require('./note');
const comment = require('./comment');
const follow = require('./follow');
const like = require('./like');

const modelList = [
    'user','note','comment','follow','like'
]

module.exports = {
    modelDefines : {
        user, note, comment,follow,like
    },
    modelList
}