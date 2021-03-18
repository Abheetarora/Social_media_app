const Post =require('../models/post');

module.exports.home= function(req, res){
//    Post.find({},function(err, posts){
//     return res.render('home', {
//         title: "Quora Clone | Home",
//         posts:posts
//     });
// });

//populate the user of each of each post 
Post.find({}).populate('user').exec(function(err,posts){
    return res.render('home', {
        title: "Quora Clone | Home",
        posts:posts
    });
});
}
//module.export.actionName=function(req,res){}