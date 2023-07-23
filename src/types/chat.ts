import { User } from "./user";

export interface Chat {
  id: string;
  message: string;
  sender: User;
  receiver: User;
  person: User;
  createdAt: Date;
}
