import { User } from '../models/User';

export class UserDomain {
  private user: User;

  constructor() {
    this.user = new User();
  }
}
