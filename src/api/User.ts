import { Api } from "./api";

export class User {
  static async search(name: string) {
    const response = await Api.get(`/user/search/${name}`);

    return response.data?.data;
  }
}
