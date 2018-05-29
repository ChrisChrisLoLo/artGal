var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//Image needs more restrictions on it. XSS attacks could probably be exploited.
var CommentSchema = new Schema(
    {
        userID: {type:String, required:true},
        artID: {type:String, required:true},
        desc: {type:String, max:140, required:true},
        creationDate: {type:Date, default:Date.now},
        parentCommentID: {type:String},
        rating: {type:Number,default:0}
    }
);

CommentSchema
.virtual('url')
.get(function(){
    return '/drawings/' + this.artID;
});

module.exports = mongoose.model('Comment', CommentSchema);