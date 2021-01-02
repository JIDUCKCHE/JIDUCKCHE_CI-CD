if(process.env.NODE_ENV === 'production') {
    module.exports = require('./live');
} else {
    module.exports = require('./dev')
}