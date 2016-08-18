'use strict';
import express from 'express';
import request from 'superagent';
import _ from 'lodash';
import User from  '../mongodb/user.js'
const router = express.Router();
router.post('/', function (req, res) {
  const userId = req.body.ID;
  const password = req.body.Password;
  if (_.isEmpty(userId)||_.isEmpty(password)) {
    res.status(400).send({message: "数据不能为空"});
  }
  else {
    request.get('https://api.xiyoumobile.com/xiyoulibv2/user/login')
      .send({username: userId, password: password})
      .end((err, resones) => {
        var Session = resones.body.Detail;
        console.log(resones.body);
        console.log("session:" + Session);
        if (Session === 'ACCOUNT_ERROR') {
          /* window.location.href = "index.html";*/
          console.log("用户名或密码有误，登录失败");
          res.status(401).send({message: "用户名或密码有误，登录失败"});
        }
        else {
          // window.location.href = "main.html?session=" + Session;
          /*   window.location.href = "/#/personalInfoPage";*/
            User.findOne({userId: userId}, function (err, user) {
           if (err) console.log(err);
           if(user == null){
           console.log("本地数据库中没有该用户信息");
             let student = new User({
               userId: userId,
               password: password,
               tel: '',
               email: ''
             });
             student.save(function (err, user) {
               console.log('save status:', err ? 'failed' : 'success');
               console.log(user);
             });
            res.status(201).send({message: "SUCCESS", newUser: true})
           }
           else {
           console.log("本地数据库中有该用户信息");
           res.status(201).send({message: "SUCCESS", newUser: false})
           }
           });
        }
      });
  }
});
router.get('/', function (req, res, next) {
  User.find((err, users) => {
    if (err) return next(err);
    res.json(users);
  });
});
export default router;
