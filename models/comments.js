var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//Image needs more restrictions on it. XSS attacks could probably be exploited.
var CommentSchema = new Schema(
    {
        userID: {type:String, required:true},
        artID: {type:String, required:true},
        desc: {type:String, max:140},
        creationDate: {type:Date, default:Date.now},
        parentCommentID: {type:String},
        rating: {type:Number,default:0}
    }
);

module.exports = mongoose.model('Comment', CommentSchema);