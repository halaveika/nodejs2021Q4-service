import bcrypt from 'bcrypt';
import { FastifyReply, FastifyRequest } from 'fastify';
import {config} from '../../common/config';
import jwt from 'jsonwebtoken';
import {UserEntity} from '../../db/entity/user';
import { User } from '../../types/User.type';
import connection from '../../server';
import {LoginReqBody} from '../../types/User.request.type'

const getUserRepository = async() => connection.then(c => c.getRepository(UserEntity));

export const generatePassword = async (password:string) => {
  const setRounds = 10
  const salt = await bcrypt.genSalt(setRounds)
  const passwordHashed = await bcrypt.hash(password, salt)

  return passwordHashed
}

const comparePassword = async (password:string, existsPassword:string) => {
  const isPasswordCorrect = await bcrypt.compare(password, existsPassword)

  if (!isPasswordCorrect) {
      throw new Error('unauthrized password')
  }

  return true
}

const loginUser = async (login:string, password:string) => {
  getUserRepository().then();
  const user = <User | undefined>await getUserRepository().then(userRepository => userRepository.findOne({login}));

  if (!user) {
      throw new Error('Forbidden')
  }
  await comparePassword(password, user.password!)

  const token = jwt.sign({
    login: user.login,
    password: user.password
  }, config.JWT_SECRET_KEY, {
      expiresIn: 120
  })
  return token
}

export const loginHandler = async(req:LoginReqBody, reply:FastifyReply):Promise<void> => {
  const { login, password } = req.body

  const userToken = await loginUser(login, password!)

  if(!userToken) {
    reply.code(403).send();
  }
  reply.code(200).send(userToken);
}

