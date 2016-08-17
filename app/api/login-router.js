'use strict';
import express from 'express';
import query from "../mongodb/query.js"
const router = express.Router();
router.post('/', query.login);
/*function (req, res) {
 const data = req.body;
 console.log(data);
 if (_.isEmpty(data)) {
 res.sendStatus(400);
 }
 else {
 /*
 User.remove({}, function(err) {
 if(err) {
 return res.json({err: err});
 } else {
 return res.json({msg: 'success'});
 }
 });
 let user = new User({
 userId: data.ID,
 password: data.Password,
 tel: '',
 email: ''
 });

 res.sendStatus(201);
 user.save(function (err, users) {
 if (err) console.log("err");
 else console.log(users);
 });
 }
 });
 router.get('/', function (req, res, next) {
 User.find((err,users) => {
 if (err) return next(err);
 res.json(users);
 });
 });*/
export default router;
