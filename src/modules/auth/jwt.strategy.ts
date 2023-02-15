import { ExtractJwt, Strategy, JwtPayload } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './../user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(jwt: JwtPayload, done) {
    console.log({ jwt })
    // const timeDiff = exp - iat;
    // console.log({ timeDiff })
    // if (timeDiff <= 0) {
    //   throw new UnauthorizedException();
    // }

    // const user = await this.usersService.findOne(email);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }

    // delete user.password;
    // done(null, user);
  }
}
