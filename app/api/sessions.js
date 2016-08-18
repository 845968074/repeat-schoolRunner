'use strict';
import express from 'express';
import request from 'superagent';
import _ from 'lodash';
import User from  '../mongodb/user.js'

const router = express.Router();

router.post('/', function (req, res, next) {
  const userId = req.body.userId;
  const password = req.body.Password;
  // console.log(userId+','+password);
  if (_.isEmpty(userId) || _.isEmpty(password)) {
    return res.status(400).send({httpCode: 400, message: "数据不能为空"});
  }
  else {
    console.log('---- visit xiyou api');
    request.get('https://api.xiyoumobile.com/xiyoulibv2/user/login')
      .send({username: userId, password: password})
      .end((err, resones) => {
        console.log('--- xiyou err:' + err);
        console.log('--- resones');
        console.log(resones);

        if (err) return next(err);
        var session = resones.body.Detail;
        console.log(resones.body);
        console.log("session:" + session);
        if (session === 'ACCOUNT_ERROR') {
          /* window.location.href = "index.html";*/
          console.log("用户名或密码有误，登录失败");
          return res.status(401).send({httpCode: 401, message: "用户名或密码有误，登录失败"});
        }
        else {
          // window.location.href = "main.html?session=" + Session;
          /*   window.location.href = "/#/personalInfoPage";*/
          console.log('---- check exist in mongdb') ;

          User.findOne({userId: userId}, function (err, user) {
            console.log('----- find one: ' + user)
            if (err) return next(err);
            if (user == null) {
              console.log("本地数据库中没有该用户信息");
              let student = new User({
                userId: userId,
                password: password,
                tel: '',
                email: ''
              });
              student.save(function (err, user) {
                console.log('---- save to mongo: ' +user)
                if (err) return next(err);


                console.log('save status:', err ? 'failed' : 'success');
                console.log(user);
                res.status(201).send({httpCode: 201, message: "SUCCESS", newUser: true})

              });
            }
            else {
              console.log("本地数据库中有该用户信息");
              res.status(201).send({httpCode: 201, message: "SUCCESS", newUser: false})
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
