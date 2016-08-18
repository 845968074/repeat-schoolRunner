'use strict';
import request from 'supertext';
import app from '../app/server';
import finish from './finish';
describe('sessions-spec', () => {
  it('post true id and password sessions', (done) => {
    request(app)
      .post('/api/sessions')
      .send({username: 's03134054', password: '123456'})
      .expect({httpCode: 201, message: "SUCCESS", newUser: true}, finish(done))
  });
  fit('post empty id and password 1 sessions', (done) => {
    request(app)
      .post('/api/sessions')
      .send({username: '', password: '123456'})
      .expect({httpCode: 400, message: "数据不能为空"}, finish(done))
  });
  it('post empty id and password 2 sessions', (done) => {
    request(app)
      .post('/api/sessions')
      .send({username: 's03134054', password: ''})
      .expect({httpCode: 400, message: "数据不能为空"}, finish(done))
  });
  it('post empty id and password 3 sessions', (done) => {
    request(app)
      .post('/api/sessions')
      .send({username: '', password: ''})
      .expect({httpCode: 400, message: "数据不能为空"}, finish(done))
  });
  it('post error id and password sessions', (done) => {
    request(app)
      .post('/api/sessions')
      .send({username: 's03134054', password: '122456'})
      .expect({httpCode: 401, message: "用户名或密码有误，登录失败"}, finish(done))
  });
});
