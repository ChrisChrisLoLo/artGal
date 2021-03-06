var Drawing = require('../models/drawings');
var Comment = require('../models/comments');
var User = require('../models/users');
var async = require('async');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const {authCheck} = require('./utils/authCheck');
//Max images/entries allowed per page 
const MAX_DRAWINGS = 20;

exports.make_drawing = [
    authCheck,
    (req,res) => {
        res.render('draw.hbs',{
            title:"Draw",
            user:req.user
        });
    }
];

// Display list of all drawings.
exports.drawing_list = function(req, res) {
    let currentPageNum = 1
    if (req.params.pageCount){
        currentPageNum = parseInt(req.params.pageCount);
    }
    
    let isFirstPage = false;
    let isLastPage = false;
    

    //TODO: put in userID and use the populate method
    let skipEntryAmount = 0;
    if (req.param.pageCount !== null){
        skipEntryAmount = (currentPageNum-1)*MAX_DRAWINGS
    }

    Drawing.find({})
        .limit(MAX_DRAWINGS)
        .skip(skipEntryAmount)
        .sort({creationDate:-1})
        .populate('artistID','displayName')
        .exec((err,listDrawings) => {
            //console.log(listDrawings);
            if (err) {return next(err);}

            //Loop that hides a drawing's artist if the artist has chosen painting to be
            //anonymous. We do not directly change the drawings displayName as the displayName property
            //is a reference, and will set all other paintings of the same user to 'Anonymous'. 

            for (var i=0;i<listDrawings.length;i++){
                //Note: I cant get comment count since there are asynchronous issues going on
                //and I don't understand how to resolve them. I'm sure there is an easy fix but
                //trying to get the query to change a global variable won't work.

                // //Get comment count
                // Comment.count({ artID: listDrawings[i]._id}, function (err, count) {
                //     if (err) {return next(err);}
                //     console.log(count)
                //     return count;                
                // });
                // listDrawings[i].commentCount = commentCount;

                //Replace author name if anonymous
                if(listDrawings[i].isAnon === true){
                    listDrawings[i].publicName = 'Anonymous';
                }
                else{
                    try{
                        listDrawings[i].publicName = listDrawings[i].artistID.displayName;
                    }
                    //Artist has been deleted
                    catch(error){
                        //console.log(error);
                        listDrawings[i].publicName = '[Removed]';
                    }
                }
                //Format date
                listDrawings[i].displayDate = listDrawings[i].creationDate
                                                            .toLocaleDateString('en-US',{
                                                                year:'numeric',
                                                                month:'short',
                                                                day:'numeric'
                                                            });
                //console.log(listDrawings[i]);
            }

            //Check if this will be the first page, the last, or neither
            console.log(currentPageNum)
            if (currentPageNum === null || currentPageNum === 1){
                isFirstPage = true;
            }
            if (listDrawings.length < MAX_DRAWINGS){
                isLastPage = true;
            }
            console.log(isFirstPage);
            console.log(isLastPage);
            res.render('index',{
                title:'ArtGal',
                user:req.user,
                listDrawings:listDrawings,
                isFirstPage:isFirstPage,
                isLastPage:isLastPage
            });
    });
};


//NOTE: The way the comments are being loaded in is "cheating" in the sense that they are not
//being populated from the drawings model. This is certainly poor design and may cause future issues
//Be sure to fix the drawings and comments model before publishing.

// Display detail page for a specific drawing.
exports.drawing_detail = function(req, res, next) {
    async.parallel({
        drawings: (callback)=>{
            Drawing.findById(req.params.id)
                .populate('artistID','displayName')
                .exec(callback);
        },
        // users: (callback)=>{
        //     User.findById(req.params.id)
        //         .exec(callback);
        // },
        comments: (callback)=>{
            Comment
                .find({
                artID:req.params.id
                },'desc creationDate')
                .populate('authorID','displayName')
                .sort({creationDate:1})
                .exec(callback);
        }
    },function(err,results){
        var publicArtist;
        if (err) {return next(err);}
        if (results.drawings==null){
            var err = new Error('Drawing not found');
            err.status = 404;
            return next(err);
        }
        if (results.drawings.isAnon === true){
            publicArtist = 'Anonymous';
        }
        else{
            try{
                publicArtist = results.drawings.artistID.displayName;
            }
            catch(error){
                console.log(error);
                publicArtist = '[Removed]';
            }
        }
        var formattedDate = results.drawings.creationDate.toLocaleDateString('en-US',{
                year:'numeric',
                month:'short',
                day:'numeric'
            });
        
        res.render('drawing',{
            title:results.drawings.title,
            user:req.user,
            imageURL:results.drawings.imageURL,
            desc:results.drawings.desc,
            tags:results.drawings.tags,
            creationDate:formattedDate,
            publicArtist:publicArtist,
            rating:results.drawings.rating,
            id:results.drawings._id,
            listComments:results.comments
        });
    });    
};

// Display drawing create form on GET.
exports.drawing_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: drawing create GET');
};

// Handle drawing create on POST.
// Self note: the reason why this is an array is because this is a middleware chain
exports.drawing_create_post = [
    authCheck,
    body('title','This post requires a title').isLength({min:1}).trim(),
    body('title','This title is too long').isLength({max:45}).trim(),
    body('desc','Description is too long').isLength({max:140}).trim(),
    body('tags','Too many letters in the tags').isLength({max:45}).trim(),
    body('imageURL','Something went wrong with the image').isLength({min:1}).trim(),
    sanitizeBody('title').trim().escape(),
    sanitizeBody('desc').trim().escape(),
    sanitizeBody('tags').trim().escape(),
    sanitizeBody('imageURL').trim().escape(),
    sanitizeBody('isAnon').trim().escape(),
    (req,res,next) => {
        const errors =validationResult(req);
        var drawing = new Drawing(
            {
            title:req.body.title,
            imageURL:req.body.imageURL,
            desc:req.body.desc,
            tags:req.body.tags,
            artistID:req.user._id,
            isAnon:req.body.isAnon==='true'
            }
        );
        if(!errors.isEmpty()){
            res.send("TODO:IMPLEMENT ERROR SCREEN");
            //res.render('genre_form', { title: 'Create Genre', genre: genre, errors: errors.array()});
            return;
        }
        else{
            drawing.save(function (err) {
                if (err) { return next(err); }
                // Genre saved. Redirect to genre detail page.
                res.redirect(drawing.url);
            });
        }
    }
];

// Display drawing delete form on GET.
exports.drawing_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: drawing delete GET');
};

// Handle drawing delete on POST.
exports.drawing_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: drawing delete POST');
};

// Display drawing update form on GET.
exports.drawing_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: drawing update GET');
};

// Handle drawing update on POST.
exports.drawing_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: drawing update POST');
};