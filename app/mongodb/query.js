let userName = "";
import User from  './user.js'
import _ from 'lodash';
class xiyouAPI {
  xiyou(userId, password) {
    $.ajax({
      url: 'http://api.xiyoumobile.com/xiyoulibv2/user/login',
      type: 'get',
      dataType: 'jsonp',
      data: {
        userId:$('#userId')[0].value,
        password:$('#password')[0].value
      }
    })
      .done(function (returnData) {
          var Session = returnData.Detail;
          if (Session == 'ACCOUNT_ERROR') {
            window.location.href = "index.html";
            alert('该用户不能登录哦(⊙o⊙)');
          }
          else
          // window.location.href = "main.html?session=" + Session;
            window.location.href = "/#/personalInfoPage";

        }
      )
      .fail(function () {
        alert("error");
      })
  }
}
module.exports = xiyouAPI;
/*exports.login = function (req, res) {
 let name = req.body.ID;
 let password = req.body.Password;
 User.findOne({userId: name}, function (err, user) {
 if (err) res.send(err.message);
 console.log(user);
 if (user == null) {
 console.log("hello");
 let f = new User({userId:name,password:password});
 f.save(function (err) {
 console.log('save status:', err ? 'failed' : 'success');
 });
 res.status(500).send('NO INFO');
 } else {
 if (user.password != password) {
 res.status(500).send('passwordError');
 } else {
 userName = name;
 if (user.tel && user.email) {
 res.send('SUCCESS');
 } else {
 res.send('personalInfo');
 }
 }
 }
 });
 };*/
exports.login = function (req, res) {
  const userId = req.body.ID;
  const password = req.body.password;
  if (_.isEmpty(userId || password)) {
    res.sendStatus(400);
  }
  else {
    User.findOne({userId: userId}, function (err, users) {
      console.log(req.body);
      if (err) res.send(err.message);
      console.log(users);
      if (users == '') {
        res.sendStatus(201);
        let student = new User({
          userId: usersId,
          password: password,
          tel: '',
          email: ''
        });
        student.save(function (err, users) {
          console.log('save status:', err ? 'failed' : 'success');
          console.log(users);
        });
      }
      /*
       res.status(500).send('NO INFO');
       } else {
       if (users.password != password) {
       res.status(500).send('passwordError');
       } else {
       userName = userId;
       if (users.tel && users.email) {
       res.send('SUCCESS');
       } else {
       res.send('personalInfo');
       }
       }
       }*/
    })
  }
};
/*exports.login=function (req,res) {
 let name=req.body.name;
 let password=req.body.password;
 let newuser=new User({name:name,password:password});
 newuser.save(function (err,User) {
 if(err) console.log("err");
 else console.log(User);
 })
 res.send('SUCCESS');
 };*/
exports.modify = function (req, res, next) {
  let email = req.body.email;
  let tel = req.body.tel;
  User.update({name: userName}, {email: email, tel: tel}, function (err) {
    if (err) {
      return next(err);
    } else {
      res.send("SUCCESS");
    }
  })
};
