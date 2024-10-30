import { Travel } from "./travel";
import { User } from "./user";

export interface Booking {
  user: User;
  _id: string;
  status: boolean;
  travel: Travel;
  people: number;
  createdAt: string;
}
