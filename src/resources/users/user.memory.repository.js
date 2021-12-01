
const { v4: uuidv4 } = require('uuid');
 
const userStore = [
 {
   id: uuidv4(),
   name: 'Alex',
   login: 'Alex123',
   password: 'uhyags8d924yhhA'
 },
 {
   id: uuidv4(),
   name: 'Olya',
   login: 'Olya123',
   password: 'ugsgs892f4yhhA'
 },
 {
   id: uuidv4(),
   name: 'Petya',
   login: 'Petya123',
   password: 'uhfffffgyags8924yhhA'
 },
 {
   id: uuidv4(),
   name: 'Vasya',
   login: 'Vasya123',
   password: 'uhyags8924yhhA'
 },
 {
   id: uuidv4(),
   name: 'Zhora',
   login: 'Zhora123',
   password: 'uhffsfyags8924yhhA'
 }
]


const getAllUsers = async() => userStore;

const getUserById = async(id) => userStore.find(user => user.id === id)

const createUser = async(user) => {
  const newUser = { id: uuidv4(), ...user};
  userStore.push(newUser);
  return newUser;
}

const updateUserById = (user, id) => {
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

  return userStore.splice(index, 1)[0];
}

module.exports = {getAllUsers, getUserById, createUser, updateUserById, deleteUserById};



