const router = require('express').Router();
const passport = require('passport');
const localStrategy = require('../strategies/LocalStrategy');
const User = require('../../models/User');



router.post('/register', (req,res,next)=>{
    let newUser = new User();

    if(req.body.firstname){
        newUser.firstname = req.body.firstname;
    }

    if(req.body.lastname){
        newUser.lastname = req.body.lastname;
    }

    if (req.body.email){
        newUser.email = req.body.email;
    }
    else{
        return res.status(401).json({message:'please provide email address'})
    }

    if (req.body.password){
        newUser.password = req.body.password;
    }else{
        return res.status(401).json({message:'please provide password'})
    }

    newUser.save( (err,doc)=>{
        if (err) return next(err);

        return res.json(doc);
    })
})

router.post('/login', (req,res,next) =>{
   
    passport.authenticate('local-login', (err, user, info)=>{
        if (err) { return next(err); }

      console.log(user)
        if (!user) { return res.status(404).json(info); }
        
        req.login(user, function(err) {
          if (err) { return next(err); }
          console.log('user found', user);
         return res.status(200).json(user);
        });
      })(req, res, next);
});



router.post('/logout', (req,res,next) =>{
    req.logout();
    return res.json({logout:true})
});


router.get('/me', (req,res,next) =>{
    console.log('me called')
    return res.json(req.user);

});


module.exports = router;