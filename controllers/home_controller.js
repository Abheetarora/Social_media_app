module.exports.home= function(req, res){
    console.log(req.cookies);
    res.cookie('user_id',25)
    return res.render('home', {
        title: "tenu le kr jaana apne naal ahaa ahaaa"
    });
}
//module.export.actionName=function(req,res){}