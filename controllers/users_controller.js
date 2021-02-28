module.exports.profile=function(req,res){
    return res.end('<h1>User profile</h1>');
}
module.exports.profound=function(req,res){
    return res.render('users',{
        title:"User"
    });
}