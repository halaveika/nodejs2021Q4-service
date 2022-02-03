import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UtilsService } from '../shared/utils/utils.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>, private utilsService: UtilsService) {}

 async getAllUsers():Promise<UserEntity[]> {
  return this.userRepository.find({})
 };

  async getUserById (id:string):Promise<UserEntity | undefined>{
    return this.userRepository.findOne({id});
  }
 
  async createUser ( userDto: CreateUserDto):Promise<Omit<UserEntity, 'password'>> {
   const {password} = userDto;
   const {id} = await this.userRepository.save({...userDto,password: await this.utilsService.generatePassword(password!)});
   return  this.userRepository.findOne({id});
 }
 
  async updateUserById(userDto: CreateUserDto, id :string):Promise<Omit<UserEntity, 'password'> | undefined>{
   const updatedUser  = this.userRepository.findOne({ id });
   if (!updatedUser) {
     return;
   }
   const {password} = userDto;
   await this.userRepository.save({ updatedUser, ...userDto,password: await this.utilsService.generatePassword(password!) });
   return this.userRepository.findOne({id});
 }
 
  async deleteUserById(id :string):Promise<boolean>{
   const userIsDeleted = !!(await this.userRepository.delete({id})).affected;
   return userIsDeleted;
 }

 async getUserByLogin (login:string):Promise<UserEntity | undefined>{
   const user = await this.userRepository.findOne({where:{login},select:['id','name','login','password']});
  return user
}
 
}
