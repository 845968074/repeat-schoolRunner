'use strict';
import express from 'express';
import xiyouAPI from "../mongodb/query.js"
import request from 'superagent';
import _ from 'lodash';
import jsonp from 'superagent-jsonp';
const router = express.Router();
import $ from 'jquery'
router.post('/', function (req, res) {
  const userId = req.body.ID;
  const password = req.body.Password;
  console.log(req.body);
  if (_.isEmpty(req.body)) {
    res.sendStatus(400);
  }
  else {
    res.sendStatus(201);
    console.log("success");
/*    $.post('http://api.xiyoumobile.com/xiyoulibv2/user/login',
      {userId: userId, password: password},
      function(data,status){
        console.log(data);
        console.log(status)
      },'jsonp');*/
/*    let xiyou=new xiyouAPI();
    xiyou.xiyou(userId,password);
    console.log(xiyou);*/
    request.get('https://api.xiyoumobile.com/xiyoulibv2/user/login?callback=jQuery31006222090500333981_1471441572918&username=s03134054&password=123456&_=1471441572921')
      .end((err, res) => {
        if (err) return console.error(err);
        console.log(res.text);
      });
  /*  $.ajax({
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
      })*/
  }
});
router.get('/', function (req, res, next) {
  User.find((err, users) => {
    if (err) return next(err);
    res.json(users);
  });
});
export default router;
