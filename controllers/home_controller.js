const Post =require('../models/post');
const User=require('../models/user');

module.exports.home= function(req, res){
//    Post.find({},function(err, posts){
//     return res.render('home', {
//         title: "Quora Clone | Home",
//         posts:posts
//     });
// });

//populate the user of each of each post 
Post.find({})
.populate('user')
.populate({
    path:'comments',
    populate:{
        path:'user',
    }
})
.exec(function(err,posts){

User.find({},function(err,users){
    return res.render('home', {
        title: "Quora Clone | Home",
        posts:posts,
        all_users:users
    });
});

    
})
}
//module.export.actionName=function(req,res){}