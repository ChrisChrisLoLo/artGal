//Checks if users are authorized to access content. Redirects them to login otherwise.
exports.authCheck = (req,res,next) => {
    if(!req.user){
        res.redirect('/auth');
    }
    else{
        next();
    }
};
