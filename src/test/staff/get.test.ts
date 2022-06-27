import request from 'supertest';
import app from '../../app';

const BODY = {
  name: 'Abhishek',
  salary: '145000',
  currency: 'USD',
  department: 'Engineering',
  sub_department: 'Platform',
};

describe('GET /staff', () => {
  let username;
  let password;
  let name;
  let http;
  let login;

  function buildRequest(url) {
    return http.get(url).set('Authorization', `Bearer ${login.body.token}`);
  }

  async function createStaff(body) {
    const res = await http.post('/staff').set('Authorization', `Bearer ${login.body.token}`).send(body);
    return res;
  }

  beforeAll(async () => {
    http = request(app);
  });

  beforeEach(async () => {
    username = `user${Date.now()}`;
    password = 'testpass';
    name = 'test account';

    await http.post('/account/register').send({ username, password, name });

    login = await http.post('/account/login').send({ username, password });
    createStaff(BODY);
  });

  test('Should get records', async () => {
    createStaff(BODY);
    const res = await buildRequest('/staff').send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject(
      [
        {
          name: BODY.name,
          salary: parseInt(BODY.salary, 10),
          currency: BODY.currency,
          department: BODY.department,
          sub_department: BODY.sub_department,
        },
        {
          name: BODY.name,
          salary: parseInt(BODY.salary, 10),
          currency: BODY.currency,
          department: BODY.department,
          sub_department: BODY.sub_department,
        },
      ],
    );
  });

  test('Should get simple statistics for all data', async () => {
    const payload = { ...BODY, salary: '1000' };
    createStaff(payload);
    const res = await buildRequest('/staff/ss').send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      min: 1000,
      max: 145000,
      mean: 109000,
    });
  });

  test('Should get simple statistics for contractors', async () => {
    createStaff({ ...BODY, salary: '1000', on_contract: true });
    createStaff({ ...BODY, on_contract: true });
    const res = await buildRequest('/staff/ss/contractors').send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      min: 1000,
      max: 145000,
      mean: 73000,
    });
  });

  test('Should get simple statistics for departments', async () => {
    createStaff({ ...BODY, salary: '1000', department: 'Operation' });
    createStaff({ ...BODY, department: 'Operation' });
    const res = await buildRequest('/staff/ss/departments').send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      min: 1000,
      max: 145000,
      mean: 101800,
      operation: {
        min: 1000,
        max: 145000,
        mean: 73000,
      },
      engineering: {
        min: 1000,
        max: 145000,
        mean: 109000,
      },
    });
  });

  test('Should get simple statistics for sub departments', async () => {
    createStaff({ ...BODY, salary: '1000', department: 'Operation' });
    createStaff({ ...BODY, department: 'Operation' });
    createStaff({ ...BODY, department: 'Operation', sub_department: 'Account' });
    createStaff({ ...BODY, department: 'Operation', sub_department: 'Editor' });
    createStaff({ ...BODY, department: 'Engineering', sub_department: 'Design' });
    createStaff({ ...BODY, department: 'Engineering', sub_department: 'Design' });
    createStaff({ ...BODY, department: 'Engineering', sub_department: 'QA Test' });
    createStaff({ ...BODY, department: 'Engineering', sub_department: 'QA' });
    const res = await buildRequest('/staff/ss/subdepartments').send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      min: 1000,
      max: 145000,
      mean: 113000,
      operation: {
        min: 1000,
        max: 145000,
        mean: 97000,
        platform: {
          min: 1000,
          max: 145000,
          mean: 73000,
        },
        account: {
          min: 145000,
          max: 145000,
          mean: 145000,
        },
        editor: {
          min: 145000,
          max: 145000,
          mean: 145000,
        },
      },
      engineering: {
        min: 1000,
        max: 145000,
        mean: 121000,
        platform: {
          min: 1000,
          max: 145000,
          mean: 113000,
        },
        design: {
          min: 145000,
          max: 145000,
          mean: 145000,
        },
        'qa test': {
          min: 145000,
          max: 145000,
          mean: 145000,
        },
      },
    });
  });
});
