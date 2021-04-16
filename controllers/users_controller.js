const User=require('../models/user');
const fs = require('fs');
const path = require('path');
const FriendShip=require("../models/Friendship.js");

// module.exports.profile=function(req,res){
//     User.findById(req.params.id,function(err,user){
//         return res.render('user_profile',{
//             title:"Profile|user",
//             profile_user:user
//         });
//     })
   
// }

module.exports.profile = async function(req, res){
    try{
    let profile_user = await User.findById(req.params.id)
    let current_user = await User.findById(req.user.id);
    let friendship = await FriendShip.findOne({
        to_user : profile_user.id,
        from_user : current_user.id
    });
    console.log(friendship);
    return res.render('user_profile', {
        title: 'User Profile',
        profile_user: profile_user,
        friendship : friendship
        });
    }
    catch(err)
    {
        console.log(err);
        return res.redirect("back");
    }

}




module.exports.update = async function(req, res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         return res.redirect('back');
    //     });
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }

    if(req.user.id == req.params.id){

        try{

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if (err) {console.log('*****Multer Error: ', err)}

                user.name=req.body.name;
                user.email = req.body.email;
                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }

                    user.avatar=User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        } catch (err) {
            req.flash('error',err);
            return res.redirect('back');  
        }

    }
    else{
        req.flash('error','Unauthorized!!');
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