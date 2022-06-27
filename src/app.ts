import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { expressjwt as jwt, Request as JWTRequest } from 'express-jwt';
import * as config from './config/dev.json';
import AccountRoute from './routes/account';
import StaffRoute from './routes/staff';

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(jwt({
  secret: process.env.token_secret || config.token_secret,
  requestProperty: 'auth',
  algorithms: ['HS256'],
}).unless({ path: ['/account/login', '/account/register'] }));

// routes begin
app.use('/account', AccountRoute);
app.use('/staff', StaffRoute);

export default app;
