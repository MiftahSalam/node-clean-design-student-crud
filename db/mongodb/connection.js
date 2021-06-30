let config = require('../../config')
let mongoose = require('mongoose')
let env = config.NODE_ENV

mongoose.Promise = global.Promise
mongoose.set('useNewUrlParser',true)

if(env === 'production') {
    const username = config.mongo.MONGO_USER
    const password = config.mongo.MONGO_PW

    mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.mtq1q.mongodb.net/clean_node_exp?retryWrites=true&w=majority`)
} else {
    mongoose.connect('mongodb://localhost:27017/clean_node'), {
        useMongoClient: true,
    }
}

mongoose.connection.once('open', function() {
    console.log('Connection has been made');
}).on('error',function(error) {
    console.log('Connect error', error);
}).on('disconnected', function() {
    console.log('Connection disconnected');
})

module.exports = mongoose
