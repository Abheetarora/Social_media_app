const User=require('../models/user');

module.exports.profile=function(req,res){
    return res.end('<h1>User profile</h1>');
}
module.exports.profound=function(req,res){
    return res.render('users',{
        title:"User"
    });
}
//render the sign up page                                                                                                               
module.exports.signup=function(req,res){
    return res.render('user_sign_up',{
        title:"Codeial|sign up",
    })
}
//render the sign in page
module.exports.signin=function(req,res){
    return res.render('user_sign_in',{
        title:"Codeial|sign In",
    })
}
//get the sign up data
module.exports.create=function(req,res){
    // if(req.body.password != req.body.confirmPassword)
    // {
    //     return res.redirect('back');
    // }
    // User.findOne({email: req.body.email},function(err,user){
    //     if(err)
    //     {
    //         console.log("error");
    //         return;
    //     }
    //     if(!user){
    //         User.create(req.body,function(){
    //             if(err)
    //             {
    //                 console.log("error");
    //                 return;
    //             } 
    //             return res.redirect('/users/sign-in');
    //         })
    //     }
    //     else{
    //         return res.redirect('back');
    //     }
    // });
}
//get the sign data
module.exports.createSession=function(req,res){
    //to do later
}