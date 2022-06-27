import request from 'supertest';
import app from '../../app';

const BODY = {
  name: 'Abhishek',
  salary: '145000',
  currency: 'USD',
  department: 'Engineering',
  sub_department: 'Platform',
};

describe('POST /staff', () => {
  let req;
  let username;
  let password;
  let name;
  let http;

  beforeEach(async () => {
    http = request(app);
  });

  beforeEach(async () => {
    username = `user${Date.now()}`;
    password = 'testpass';
    name = 'test account';
    await http.post('/account/register').send({ username, password, name });
    const login = await http.post('/account/login').send({ username, password });
    req = http.post('/staff').set('Authorization', `Bearer ${login.body.token}`);
  });

  test('Should add a record', async () => {
    const res = await req.send(BODY);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toMatchObject({
      name: BODY.name,
      salary: BODY.salary,
      currency: BODY.currency,
      department: BODY.department,
      sub_department: BODY.sub_department,
    });
  });

  test('Should fail to add record with invalid data', async () => {
    const payload = { ...BODY, salary: 25000 };
    const res = await req.send(payload);
    expect(res.statusCode).toEqual(400);
  });
});
