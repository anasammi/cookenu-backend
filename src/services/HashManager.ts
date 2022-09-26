import * as bcryptjs from "bcryptjs";
import dotenv from "dotenv"

dotenv.config();

export class HashManager {
  async hash(text: string): Promise<string> {
    const rounds = Number(process.env.BCRYPT_COST);
    const salt = await bcryptjs.genSalt(rounds);
    return await bcryptjs.hash(text, salt);
  }

  async compare(text: string, hash: string): Promise<boolean> {
    return await bcryptjs.compare(text, hash);
  }
}
