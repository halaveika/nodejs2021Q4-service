import { define } from "typeorm-seeding";
import { UserEntity } from "../entity/user";


define(UserEntity, () => {
  const user = new UserEntity();
  user.name = 'Seed';
  user.login = 'admin';
  user.password = 'admin';
  return user;
});
