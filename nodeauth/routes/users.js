var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 注册
router.get('/register', function(req, res, next){
  res.render('register', {
    title: "Register"
  });
});

//登录页
router.get('/login', function(req,res,next){
  res.render('login', {
    title: "Login"
  });
});

//注册
router.post('/register', function(req, res, next){
  //获取表单数据
  var name = req.body.name,
      email = req.body.email,
      username = req.body.username,
      password = req.body.password,
      password2 = req.body.password2;

      //检测头像
      if(req.files.profileImage){
        console.log('Uploading files...');

        //文件类型
        var profileImageOriginalName = req.files.profileImage.originalname,
            profileImageName = req.files.profileimage.name,
            profileImageMime = req.files.profileimage.mimetype,
            profileImagePath = req.files.profileimage.path,
            profileImageExt = req.files.profileimage.extension,
            profileImageSize = req.files.profileimage.size;
      }else{
        //设置一个默认的图片
        var profileImageName = "noimage.png";
      }

      //表单验证
      req.checkBody('name','Name filed is required').notEmpty();
      req.checkBody('email','Email filed is required').notEmpty();
      req.checkBody('email','Email not valid').isEmail();
      req.checkBody('username','Username filed is required').notEmpty();
      req.checkBody('password','Password filed is required').notEmpty();
      req.checkBody('password2','Passwords do not match').equals(req.body.password);
      req.checkBody('name','Name filed is required').notEmpty();

      var errors = req.validationErrors();
      if(errors){
        res.render('register', {
           errors: errors,
           name: name,
           email: email,
           username: username,
           password: password,
           password2: password2
         });
      }else {
        //创建新用户
        var newUser = new User({
           name: name,
           email: email,
           username: username,
           password: password,
           profileimage: profileImageName
        });

        //创建 User
        User.createUser(newUser, function(err, user){
          if(err) throw err;
          console.log(user);
        });

        //success message
        req.flash('success', 'you are now registered and may log in');

        res.location('/');
        res.redirect('/');
   }
});


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

//passport
passport.use(new LocalStrategy(
      function(username, password, done){
        User.getUserByUsername(username, function(err, user){
          if(err) throw err;
          if(!user){
            console.log("Unknown User");
            return done(null, false, {message:"Unknown User"});
          }
          //验证密码
          User.comparePassword(password, user.password, function(err, isMatch){
            if(err) throw err;
            if(isMatch){
              return done(null, user);
            }else{
              console.log('Invalid Password');
              return done(null, false, {message: 'Invalid Password'});
            }
          })
        })
    }
));

// 登录
router.post('/login',  passport.authenticate('local', {failureRedirect: '/users/login',failureFlash:"Invalid username or password " }),function(req,res,next){
  console.log('Authentication Successful');
  req.flash('success', 'You are logged in');
  res.redirect('/');
});




module.exports = router;
