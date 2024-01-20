import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongo_url: process.env.MONGO_URL,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    token: process.env.JWT_TOKEN,
    token_expires: process.env.JWT_TOKEN_EXPIRES_IN,
    refresh_token: process.env.JWT_REFRESH_TOKEN,
    refresh_expires_in: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  },
};
