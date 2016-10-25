var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET contact page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

// 发邮件
router.post('/send', function(req,res,next){
  var transporter = nodemailer.createTransport({
    service: 'qq',
    auth:{
      user: '1182770457@qq.com', //账号
      pass: 'vpckybqlgwcdgcbh' //授权码
    }
  });

  var mailOptions = {
    from: 'zhouyufei <1182770457@qq.com>',
    to: 'zhouyufei1990@126.com',  //送达客户端
    subject: "Website submission",
    text: 'You have anew submission with the detail: '+req.body.name+' Email: '+req.body.email+'Message: '+req.body.message,
    html: '<p>You got a new submission with the following details...</p><ul><li> Name: '+req.body.name+'</li><li> Email: '+req.body.email+'</li><li> Message: '+req.body.message+'</li></ul>'
  };

transporter.sendMail(mailOptions, function(error, info){
  if(error){
    console.log(error);
    res.redirect('/');
  }else{
    console.log('Message Sent: '+ info.response);
    res.redirect('/');
  }
});

})

module.exports = router;
