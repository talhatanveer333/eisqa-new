import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ResponseCode, ResponseMessage } from '../../utils/enum';
import { MailService } from '../../utils/mailer/mail.service';
import { RegisterPayload } from '.';
import { Hash } from '../../utils/Hash';
import { User } from '../user/user.entity';
import { UsersService } from '../user/user.service';
import { LoginPayload } from './login.payload';
import { ConfirmationPayload } from './confirmation.payload';
import { generateKey, generateTotpUri, verifyToken } from "authenticator";
import { ToggleTwoFactorPayload, TwoFactorPayload, ConfrimEmailPayload } from './commons/auth.dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly mailerservice: MailService,
  ) { }

  async createToken(
    user: User,
    expiryTime?: number | string,
    subject?: string,
  ) {
    return {
      expiresIn: process.env.JWT_EXPIRATION_TIME,
      accessToken: this.jwtService.sign(
        { uuid: user.user_id, email: user.email, image: user.profile_picture, role: user.role },
        {
          subject: subject ? process.env.JWT_SECRET_KEY + user.password : '',
          expiresIn: expiryTime ? expiryTime : process.env.JWT_EXPIRATION_TIME,
        },
      ),
      user,
    };
  }

  /**
   * Register a genesis user
   * @param payload
   * @returns
   */
  public async register(payload: User): Promise<User> {
    return new Promise<User>(async (resolve, reject) => {
      await this.userService
        .create(payload)
        .then(async (user: User) => {
          await this.createToken(user);
          return resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async validateUser(payload: LoginPayload): Promise<any> {
    const user = await this.userService.findOne(payload.email);
    if (!user) {
      throw new HttpException(
        ResponseMessage.INVALID_USERNAME_OR_PASSWORD,
        ResponseCode.BAD_REQUEST,
      );
    }
    const isValidPassword = await Hash.compare(payload.password, user.password);
    if (!isValidPassword) {
      throw new HttpException(
        ResponseMessage.INVALID_USERNAME_OR_PASSWORD,
        ResponseCode.BAD_REQUEST,
      );
    }
    return user;
  }

  // /**
  //  * Send Password Recovery Link To User Email
  //  * @param email
  //  * @returns
  //  */
  // public async forgotPassword(email: string): Promise<void> {
  //   const user = await this.userService.findOne(email);
  //   if (user) {
  //     const token = await this.createToken(
  //       user,
  //       process.env.JWT_TIME_FORGOT_PASSWORD,
  //       user.password,
  //     );
  //     await this.mailerservice.sendForgotPasswordMail(
  //       user.email,
  //       token.accessToken,
  //     );
  //     return;
  //   } else {
  //     throw new HttpException(
  //       ResponseMessage.EMAIL_NOT_REGISTERED,
  //       ResponseCode.NOT_FOUND,
  //     );
  //   }
  // }


  // /**
  //  * Confirm the forgot password and update
  //  * @param email
  //  * @param password
  //  * @returns
  //  */
  // public async confirmForgotPassword(email: string, password: string) {
  //   await this.userService.confirmForgotPassword(email, password);
  //   return;
  // }
  // /**
  //  * 
  //  * @param user 
  //  * @returns ToTpURI key and corresponding URI
  //  */
  // public async generateToTpURI(user: User) {
  //   let key = user.twoFaKey ? user.twoFaKey : generateKey();
  //   let formattedKey = key.replace(/\s/g, "").toUpperCase();
  //   user.twoFaKey ? null : await this.userService.setToTpURI(user, formattedKey);

  //   const toTpURI = generateTotpUri(
  //     formattedKey,
  //     user.email,
  //     process.env.APP_NAME,
  //     "SHA1",
  //     6,
  //     30
  //   );
  //   return { toTpURI, formattedKey };
  // }
}
