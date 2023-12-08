/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtAtSecret } from '../constants';
import { Injectable } from '@nestjs/common';


type JwtPayload = {
    sub: string,
    email: string
}

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtAtSecret.secret,
        });
    }

    validate(payload: JwtPayload) {
        return payload;
    }
}
