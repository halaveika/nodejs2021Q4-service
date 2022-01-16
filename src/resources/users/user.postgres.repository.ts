import { v4 as uuidv4 } from 'uuid';
import { User } from '../../types/User.type';
import {UserEntity} from '../../db/entity/user';
import {TaskEntity} from '../../db/entity/task';
import connection from '../../server';

const getUserRepository = async() => await connection.then(c => c.getRepository(UserEntity));
const getTaskRepository = async() => await connection.then(c => c.getRepository(TaskEntity));

/**
 * Returns array of Users
 * @returns Promise of array Users
 */
export const getAllUsers = async():Promise<User[]> => getUserRepository().then(userRepository => userRepository.find({}));

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
export const createUser = async(user:User):Promise<User> => 
getUserRepository().then(userRepository => userRepository.save({ id: uuidv4(), ...user}));

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
  return await userRepository.save({ updatedUser, ...user });
}

/**
 * Returns deleted User by id & change userId of deleted User's tasks to null
 * @param id - id of User
 * @returns Promise of boolean
 */
export const deleteUserById = async(id :string):Promise<boolean> => {
  const userIsDeleted = (await getUserRepository().then(userRepository =>
     userRepository.delete({ id}))).affected ? true : false;
  if (userIsDeleted) {
    await userIdToNullPostgres(id);
  }
  return userIsDeleted;
}


async function userIdToNullPostgres(id:string):Promise<void>  {
  const taskRepository = await getTaskRepository();
  const tasks = await taskRepository.find({id});
  tasks.forEach(task => taskRepository.save({...task, userId: null}))
}



