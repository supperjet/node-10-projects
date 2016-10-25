var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/nodedb'),
    crypto = require('crypto'); //加密模块

var db = mongoose.connection;


//创建 User Schema(模式)
var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  name: {
    type: String
  },
  profileimage: {
    type: String
  }
});

//统过模式创建模型
var User = module.exports = mongoose.model('User', UserSchema);

//创建 user
module.exports.createUser = function(newUser, callback){
  //生成密码的 md5 值
  var md5 = crypto.createHash('md5'),
      passwordCrypto = md5.update(newUser.password).digest('hex');
  newUser.password = passwordCrypto;
  newUser.save(callback);
}

module.exports.getUserByUsername = function(username, callback){
  var query = {username: username};
  User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.comparePassword = function(canPassword, hash, callback){
  var md5 = crypto.createHash('md5'),
      canPasswordCrypto = md5.update(canPassword).digest('hex');
  if(canPasswordCrypto !== hash){
    throw callback(err);
  }else{
    callback(null, isMatch);
  }
}
