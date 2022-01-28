import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { generatePassword } from 'src/utils/utilsPassword';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity> ) {}

/**
 * Returns array of Users
 * @returns Promise of array Users
 */
 async getAllUsers():Promise<UserEntity[]> {
  return this.userRepository.find({})
 };

 /**
  * Returns User by id
  * @param id - id of User
  * @returns Promise of User or undefined
  */
  async getUserById (id:string):Promise<UserEntity | undefined>{
    return this.userRepository.findOne({id});
  }
 
 /**
  * Returns new created User
  * @param user - User object for creating User in store
  * @returns Promise of User
  */
  async createUser (user:UserEntity):Promise<UserEntity> {
   const {password} = user;
   console.log(password);
   return this.userRepository.save({...user,password: await generatePassword(password!)});
 }
 
 /**
  * Returns updated User by id
  * @param user - User object for updating User in store by id
  * @param id - id of User
  * @returns Promise of User or undefined
  */
  async updateUserById(user:UserEntity, id :string):Promise<UserEntity | undefined>{
   const updatedUser  = this.userRepository.findOne({ id });
   if (!updatedUser) {
     return;
   }
   const {password} = user;
   return this.userRepository.save({ updatedUser, ...user,password: await generatePassword(password!) });
 }
 
 /**
  * Returns deleted User by id & change userId of deleted User's tasks to null
  * @param id - id of User
  * @returns Promise of boolean
  */
  async deleteUserById(id :string):Promise<boolean>{
   const userIsDeleted = !!(await this.userRepository.delete({id})).affected;
   return userIsDeleted;
 }
 

}
