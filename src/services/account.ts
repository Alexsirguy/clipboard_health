import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Accounts from '../models/accounts';
import * as config from '../config/dev.json';

class AccountService {
  static errorMessage = {
    loginFail: 'Invalid login credentials',
    loginSuccess: 'Login successful',
    registerFail: 'Could not create an account',
    registerSuccess: 'Account created successfully',
  };

  static async login(username: string, password: string) {
    if (await Accounts.checkUsername(username)) {
      const user = await Accounts.findByUsername(username);
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign(
          { username: user.username, name: user.name, id: user.id },
          process.env.token_secret || config.token_secret,
          {
            algorithm: 'HS256',
          },
        );
        return { success: true, token, message: this.errorMessage.loginSuccess };
      }
    }
    return { success: false, token: '', message: this.errorMessage.loginFail };
  }

  static async register(name: string, username: string, password: string) {
    if (await Accounts.checkUsername(username)) {
      return { success: false, userTaken: true, message: this.errorMessage.registerFail };
    }
    const hash = await bcrypt.hash(password, 10);

    const data = await Accounts.create({
      name,
      username,
      password: hash,
    });

    if (data) {
      return { success: true, message: this.errorMessage.registerSuccess };
    }
    return { success: false, message: this.errorMessage.registerFail };
  }
}

export default AccountService;
