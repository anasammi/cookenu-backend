import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { USER_ROLES } from "../model/User";

dotenv.config();

export interface AuthenticationData {
  role: USER_ROLES;
  id: string
}

export class Authenticator {
  public generateToken(input: AuthenticationData): string {
    const token = jwt.sign({input}, process.env.JWT_KEY as string, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });
    return token;
  }

  public getTokenData(token: string): string | null {
    const data = jwt.verify(token, process.env.JWT_KEY as string) as any;
    return data.input;
  }
}
