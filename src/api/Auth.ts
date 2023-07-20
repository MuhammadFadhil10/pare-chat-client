import { Api } from "./api";

export class Auth {
  static async signin(payload: unknown) {
    const response = await Api.post("/auth/signin", payload);

    return response.data.data;
  }
  static async signup(payload: unknown) {
    return await Api.post("/auth/signup", payload);
  }
}
