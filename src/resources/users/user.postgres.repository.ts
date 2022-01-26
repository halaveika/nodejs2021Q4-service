import { User } from '../../types/User.type';
import {UserEntity} from '../../db/entity/user';
import connection from '../../server';
import {generatePassword} from '../../utils/utilsPassword';

const getUserRepository = async() => connection.then(c => c.getRepository(UserEntity));

/**
 * Returns array of Users
 * @returns Promise of array Users
 */
export const getAllUsers = async():Promise<User[]> =>getUserRepository().then(userRepository => userRepository.find({}));

/**
 * Returns User by id
 * @param id - id of User
 * @returns Promise of User or undefined
 */
export const getUserById = async(id:string):Promise<User | undefined> => getUserRepository().then(userRepository => userRepository.findOne({id}));

/**
 * Returns new created User
 * @param user - User object for creating User in store
 * @returns Promise of User
 */
export const createUser = async(user:User):Promise<User> => {
  const userRepository = await getUserRepository();
  const {password} = user;
  return userRepository.save({...user,password: await generatePassword(password!)})
}

/**
 * Returns updated User by id
 * @param user - User object for updating User in store by id
 * @param id - id of User
 * @returns Promise of User or undefined
 */
export const updateUserById = async(user:User, id :string):Promise<User | undefined> => {
  const userRepository = await getUserRepository();
  const updatedUser  = userRepository.findOne({ id });
  if (!updatedUser) {
    return;
  }
  const {password} = user;
  return userRepository.save({ updatedUser, ...user,password: await generatePassword(password!) });
}

/**
 * Returns deleted User by id & change userId of deleted User's tasks to null
 * @param id - id of User
 * @returns Promise of boolean
 */
export const deleteUserById = async(id :string):Promise<boolean> => {
  const userRepository = await getUserRepository();
  const userIsDeleted = !!(await userRepository.delete({id})).affected;
  return userIsDeleted;
}




