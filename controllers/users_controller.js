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