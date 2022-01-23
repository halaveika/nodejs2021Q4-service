import { define } from "typeorm-seeding";
import { UserEntity } from "../entity/user";
import {generatePassword} from '../../resources/login/login.handler'


define(UserEntity, () => {
  const user = new UserEntity();
  user.name = 'Seed';
  user.login = 'admin';
  generatePassword('admin').then(password=>user.password = password );
  return user;
});
