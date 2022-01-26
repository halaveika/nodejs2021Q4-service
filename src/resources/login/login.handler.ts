import { FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import {config} from '../../common/config';
import {UserEntity} from '../../db/entity/user';
import { User } from '../../types/User.type';
import connection from '../../server';
import {LoginReqBody} from '../../types/User.request.type';
import  {comparePassword } from '../../utils/utilsPassword';

const getUserRepository = async() => connection.then(c => c.getRepository(UserEntity));

const loginUser = async (login:string, password:string) => {
  getUserRepository().then();
  const user = <User | undefined>await getUserRepository().then(userRepository => userRepository.findOne({login}));
  if (!user) {
      throw new Error('Forbidden')
  }
  await comparePassword(password, user.password!)

  const token = jwt.sign({
    id: user.id,
    login: user.login
  }, config.JWT_SECRET_KEY)
  return token
}

export const loginHandler = async(req:LoginReqBody, reply:FastifyReply):Promise<void> => {
  const { login, password } = req.body
  const token = await loginUser(login, password!)

  if(!token) {
    reply.code(403).send();
  }
  reply.code(200).send({token});
}

