import { v4 as uuidv4 } from 'uuid';
import {taskStore,userStore} from '../../db/store';
import {userIdToNull} from '../../utils/helper';
import { User } from '../../types/User.type';

export const getAllUsers = async():Promise<User[]> => userStore;

export const getUserById = async(id:string):Promise<User | undefined> => userStore.find(user => user.id === id)

export const createUser = async(user:User):Promise<User> => {
  const newUser = { id: uuidv4(), ...user};
  userStore.push(newUser);
  return newUser;
}

export const updateUserById = async(user:User, id :string):Promise<User | undefined> => {
  const index = userStore.findIndex(item => item.id === id);
  let updatedUser:User | undefined;
  if (index !== -1) {
    updatedUser = { ...userStore[index], ...user };
    userStore.splice(index, 1, updatedUser);
  }
  return updatedUser;
}

export const deleteUserById = async(id :string):Promise<User | boolean> => {
  const index = userStore.findIndex(user => user.id === id);
  if (index === -1) {
    return false;
  }
  userIdToNull(taskStore,id);
  return userStore.splice(index, 1)[0];
}



