const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const LockerSchema = new Schema({
    lockerName:{type:String,unique:true},
    key:{type:String},
    depositor:{type:Schema.Types.ObjectId, ref:'User'},
    startDateTime:{type:Date},
    endDateTime:{type:Date},
    dimensions:{
        length:{type:String},
        width:{type:String},
        bredth:{type:String}
    },
    state:{type:String, enum:['open','closed', 'blocked']},
    isReserved:{type:Boolean, default:false},
    isBooked:{type:Boolean, default:false}

});


LockerSchema.pre('save', function(next){
    
    var locker = this;
    if (!locker.isModified('key')) {
        return next();
    }
    bcrypt.genSalt(10, function(err, salt){
        if (err) {
            return next(err);
        }
        bcrypt.hash(locker.key, salt, null, function(err, hash){
        if (err) {return next(err);}
        locker.key = hash;	
        next();
        });
        
    });
});

LockerSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.key);
}


module.exports = mongoose.model('Locker', LockerSchema);






