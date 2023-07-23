import { Api } from "./api";

export class Message {
  static async getChats(userId: string) {
    const response = await Api.get(`/message/${userId}`);

    return response.data?.data;
  }
}
