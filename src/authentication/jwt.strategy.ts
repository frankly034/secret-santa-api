import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { validate } from "class-validator";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/users/users.service";
import { TokenPayload } from "./tokenPayload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(private configService: ConfigService, private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => req?.cookies?.Authentication]),
      secretOrKey: configService.get('JWT_SECRET'),
    })
  }
  validate(payload: TokenPayload) {
    return this.userService.getById(payload.id);
  }
}