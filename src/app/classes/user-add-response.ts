import { User } from './user';

export class UserAddResponse {
  code: number;
  message: string;
  user: User;
}
