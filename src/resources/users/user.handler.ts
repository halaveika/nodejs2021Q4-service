import { FastifyReply, FastifyRequest } from 'fastify';
import {getAllUsers, getUserById, createUser, updateUserById, deleteUserById}from './user.postgres.repository';
import {UserReq, UserReqParams, UserReqBody} from '../../types/User.request.type';

/**
 * Get all Users from User.repository, then send response  with statuscode 200 and body with array of all Users to the client
 * @param _req - request object
 * @param reply - response object
 */
export const getAllUsersHandler = async(_req:FastifyRequest, reply:FastifyReply):Promise<void> => {
  const users = await getAllUsers();
  reply.code(200).send(users);
}

/**
 * Get User by is from User.repository, then send response  with statuscode 200 and body with User of current id or send response with 404 error to the client
 * @param req - request object with params id
 * @param reply - response object
 */
export const getUserByIdHandler = async(req:UserReqParams, reply:FastifyReply):Promise<void> => {
  const { id } = req.params;
  const user = await getUserById(id);
  if(!user) {
    reply.code(404).send();
  }
  reply.code(200).send(user);
}

/**
 * Create new User in User.repository from body in request, then send response  with statuscode 201 and body with created User or send response with 400 error to the client
 * @param req - request object with body User.type
 * @param reply - response object
 */
export const createUserHandler = async(req:UserReqBody, reply:FastifyReply):Promise<void> => {
  const user = req.body;
  const newUser = await createUser(user);
  if(!newUser) {
    reply.code(400).send();
  }
  reply.code(201).send(newUser);
}

/**
 * Update existed User in User.repository from body in request by id from params , then send response  with statuscode 200 and body with updated User or send response with 400 error to the client
 * @param req - request object with body User.type and params id
 * @param reply - response object
 */
export const updateUserByIdHandler = async(req:UserReq, reply:FastifyReply):Promise<void> => {
  const user = req.body;
  const { id } = req.params;
  const updatedUser = await updateUserById(user,id);
  if(!updatedUser) {
    reply.code(400).send();
  }
  reply.code(200).send(updatedUser);
}

/**
 * Delete User in User.repository by id, then send response  with statuscode 204 or send response with 401 error to the client
 * @param req - request object with params id
 * @param reply - response object
 */
export const deleteUserByIdHandler = async(req:UserReq, reply:FastifyReply):Promise<void> => {
  const { id } = req.params;
  const isDeleted = await deleteUserById(id);
  if(!isDeleted) {
    reply.code(401).send();
  }
  reply.code(204).send();
}