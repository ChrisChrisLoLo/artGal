var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//Image needs more restrictions on it. XSS attacks could probably be exploited.
var UserSchema = new Schema(
    {   
        googleID: {type:String},
        facebookID: {type:String},
        displayName: {type:String, required:true, max:35},
        firstName: {type:String,max:35},
        lastName: {type:String,max:35},
        gender: {type:String, max:15},
        profileDesc: {type:String, max:140},
        creationDate: {type:Date, default:Date.now},
        banned: {type:Boolean, default:false},
        banEndDate: {type:Date},
        rating: {type:Number, default:0}
    }
);

UserSchema
.virtual('name')
.get(function(){
    return this.firstName+' '+this.lastName;
});

UserSchema
.virtual('url')
.get(function(){
    return '/users/'+this._id;
});

module.exports = mongoose.model('User', UserSchema);