import request from 'supertest';
import app from '../../app';

const BODY = {
  name: 'Abhishek',
  salary: '145000',
  currency: 'USD',
  department: 'Engineering',
  sub_department: 'Platform',
};

describe('DELETE /staff', () => {
  let req;
  let username;
  let password;
  let name;
  let http;
  let login;

  beforeAll(async () => {
    http = request(app);
  });

  beforeEach(async () => {
    username = `user${Date.now()}`;
    password = 'testpass';
    name = 'test account';

    await http.post('/account/register').send({ username, password, name });

    login = await http.post('/account/login').send({ username, password });
    const staff = await http.post('/staff').set('Authorization', `Bearer ${login.body.token}`).send(BODY);

    req = http.delete(`/staff/${staff.body.id}`).set('Authorization', `Bearer ${login.body.token}`);
  });

  test('Should delete a record', async () => {
    const res = await req.send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: 'Record deleted successfully',
    });
  });

  test('Should fail to delete record with invalid id', async () => {
    const res = await http.delete(`/staff/${Date.now()}}`).set('Authorization', `Bearer ${login.body.token}`).send();
    expect(res.statusCode).toEqual(400);
  });
});
