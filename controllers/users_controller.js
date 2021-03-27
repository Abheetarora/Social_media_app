const User=require('../models/user');

module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:"Profile|user",
            profile_user:user
        });
    })
   
}
module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}


module.exports.profound=function(req,res){
    return res.render('users',{
        title:"User"
    });
}
//render the sign up page                                                                                                               
module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile')
    }
    return res.render('user_sign_up',{
        title:"Codeial|sign up",
    })
}
//render the sign in page
module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
       return  res.redirect('/users/profile')
    }
    return res.render('user_sign_in',{
        title:"Codeial|sign In",
    })
}
//get the sign up data
// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){req.flash('error', err); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){req.flash('error', err); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }

    });
}


//get the sign data
module.exports.createSession = function(req, res){
    req.flash('success','Logged in successfully');
    return res.redirect('/');
}
module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success','You have logged out');
    res.redirect('/');
}