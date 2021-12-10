import { v4 as uuidv4 } from 'uuid';
import {taskStore,userStore} from '../../db/store';
import {userIdToNull} from '../../utils/helper';

export const getAllUsers = async() => userStore;

export const getUserById = async(id) => userStore.find(user => user.id === id)

export const createUser = async(user) => {
  const newUser = { id: uuidv4(), ...user};
  userStore.push(newUser);
  return newUser;
}

export const updateUserById = async(user, id) => {
  const index = userStore.findIndex(item => item.id === id);
  let updatedUser;
  if (index !== -1) {
    updatedUser = { ...userStore[index], ...user };
    userStore.splice(index, 1, updatedUser);
  }
  return updatedUser;
}

export const deleteUserById = async(id) => {
  const index = userStore.findIndex(user => user.id === id);
  if (index === -1) {
    return false;
  }
  userIdToNull(taskStore,id);
  return userStore.splice(index, 1)[0];
}



