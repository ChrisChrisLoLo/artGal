var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//Image needs more restrictions on it. XSS attacks could probably be exploited.
var DrawingSchema = new Schema(
    {
        title: {type:String, required:true, max:45},
        //NOTE: there were 6766 chars in a tested image, so this imageCap should
        //suffice. However this is an assumption for now and may cause issues later.
        imageURL: {type:String, required:true, max:7000},
        desc: {type:String, max:140},
        tags: [{type:String}],
        creationDate: {type:Date, default:Date.now},
        isAnon: {type:Boolean,required:true,default:false},
        artistID: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
        },
        rating: {type:Number,default:0}
    }
);

DrawingSchema
.virtual('url')
.get(function(){
    return '/drawings/' + this._id;
});

module.exports = mongoose.model('Drawing', DrawingSchema);