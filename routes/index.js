const auth = require('../authentication/routes/auth.routes');
const lockers = require('./locker.routes');

module.exports =function (app){
    app.use('/api/auth',auth)
    app.use('/api/locker',lockers)

}