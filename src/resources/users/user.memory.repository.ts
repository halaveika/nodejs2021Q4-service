import { v4 as uuidv4 } from 'uuid';
import {taskStore,userStore} from '../../db/store';
import {userIdToNull} from '../../utils/helper';
import { User } from '../../types/User.type';

/**
 * Returns array of Users
 * @returns Promise of array Users
 */
export const getAllUsers = async():Promise<User[]> => userStore;

/**
 * Returns User by id
 * @param id - id of User
 * @returns Promise of User or undefined
 */
export const getUserById = async(id:string):Promise<User | undefined> => userStore.find(user => user.id === id)

/**
 * Returns new created User
 * @param user - User object for creating User in store
 * @returns Promise of User
 */
export const createUser = async(user:User):Promise<User> => {
  const newUser = { id: uuidv4(), ...user};
  userStore.push(newUser);
  return newUser;
}

/**
 * Returns updated User by id
 * @param user - User object for updating User in store by id
 * @param id - id of User
 * @returns Promise of User or undefined
 */
export const updateUserById = async(user:User, id :string):Promise<User | undefined> => {
  const index = userStore.findIndex(item => item.id === id);
  let updatedUser:User | undefined;
  if (index !== -1) {
    updatedUser = { ...userStore[index], ...user };
    userStore.splice(index, 1, updatedUser);
  }
  return updatedUser;
}

/**
 * Returns deleted User by id & change userId of deleted User's tasks to null
 * @param id - id of User
 * @returns Promise of boolean
 */
export const deleteUserById = async(id :string):Promise<boolean> => {
  const index = userStore.findIndex(user => user.id === id);
  if (index === -1) {
    return false;
  }
  userIdToNull(taskStore,id);
  return true;
}



