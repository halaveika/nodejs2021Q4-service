
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





const getAll = async () => userStore;

module.exports = { getAll };
