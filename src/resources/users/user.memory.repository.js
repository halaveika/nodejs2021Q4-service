const { v4: uuidv4 } = require('uuid');
const {taskStore,userStore} = require('../../db/store');

const getAllUsers = async() => userStore;

const getUserById = async(id) => userStore.find(user => user.id === id)

const createUser = async(user) => {
  const newUser = { id: uuidv4(), ...user};
  userStore.push(newUser);
  return newUser;
}

const updateUserById = async(user, id) => {
  const index = userStore.findIndex(item => item.id === id);
  let updatedUser;
  if (index !== -1) {
    updatedUser = { ...userStore[index], ...user };
    userStore.splice(index, 1, updatedUser);
  }
  return updatedUser;
}

const deleteUserById = async(id) => {
  const index = userStore.findIndex(user => user.id === id);
  if (index === -1) {
    return false;
  }
  /* eslint-disable */ 
  taskStore.forEach(task => {if (task.userId === id) {task.userId = null}});
   /* eslint-enable */ 
  return userStore.splice(index, 1)[0];
}

module.exports = {getAllUsers, getUserById, createUser, updateUserById, deleteUserById};



