import {getAllUsers, getUserById, createUser, updateUserById, deleteUserById}from './user.memory.repository';

export const getAllUsersHandler = async(req, reply) => {
  const users = await getAllUsers();
  reply.code(200).send(users);
}

export const getUserByIdHandler = async(req, reply) => {
  const { id } = req.params;
  const user = await getUserById(id);
  if(!user) {
    reply.code(404).send();
  }
  reply.code(200).send(user);
}

export const createUserHandler = async(req, reply) => {
  const user = req.body;
  const newUser = await createUser(user);
  if(!newUser) {
    reply.code(400).send();
  }
  reply.code(201).send(newUser);
}

export const updateUserByIdHandler = async(req, reply) => {
  const user = req.body;
  const { id } = req.params;
  const updatedUser = await updateUserById(user,id);
  if(!updatedUser) {
    reply.code(400).send();
  }
  reply.code(200).send(updatedUser);
}

export const deleteUserByIdHandler = async(req, reply) => {
  const { id } = req.params;
  const isDeleted = await deleteUserById(id);
  if(!isDeleted) {
    reply.code(401).send();
  }
  reply.code(204).send();
}