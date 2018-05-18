var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//Image needs more restrictions on it. XSS attacks could probably be exploited.
var DrawingSchema = new Schema(
    {
        title: {type:String, required:true, max:45},
        imageURL: {type:String, required:true},
        desc: {type:String, max:140},
        tags: [{type:String}],
        creationDate: {type:Date, default:Date.now},
        isAnon: {type:Boolean,default:true},
        userID: {type:String},
        rating: {type:Number}
    }
);

DrawingSchema
.virtual('url')
.get(function(){
    return '/drawings/' + this._id;
});

module.exports = mongoose.model('Drawing', DrawingSchema);