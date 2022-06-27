import request from 'supertest';
import app from '../../app';

describe('POST /login', () => {
  let req;
  let username;
  let password;
  let name;
  let http;

  beforeAll(async () => {
    http = request(app);
  });

  beforeEach(async () => {
    username = `user${Date.now()}`;
    password = 'testpass';
    name = 'test account';
    await http.post('/account/register').send({ username, password, name });
    req = http.post('/account/login');
  });

  test('Should login with valid login credentials', async () => {
    const res = await req.send({ username, password });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      token: res.body.token,
      message: 'Login successful',
    });
  });

  test('Should fail to login with invalid login credentials', async () => {
    const res = await req.send({ username: 'username', password });
    expect(res.statusCode).toEqual(401);
  });

  test('Should reject request with bad data', async () => {
    const res = await req.send({ username: 'username/@#', password });
    expect(res.statusCode).toEqual(400);
  });
});
