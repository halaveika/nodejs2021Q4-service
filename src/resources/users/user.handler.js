const {rmPasswordFromRes} = require('../../utils/helper')
const {getAllUsers, getUserById, createUser, updateUserById, deleteUserById} = require('./user.memory.repository');

const getAllUsersHandler = async(req, reply) => {
  const users = await getAllUsers();
  const resp = users.map(el=> rmPasswordFromRes(el));
  reply.code(200).send(resp);
}

const getUserByIdHandler = async(req, reply) => {
  const { id } = req.params;
  const user = await getUserById(id);
  if(!user) {
    reply.code(404).send();
  }
  reply.code(200).send(rmPasswordFromRes(user));
}

const createUserHandler = async(req, reply) => {
  const user = req.body;
  const newUser = await createUser(user);
  if(!newUser) {
    reply.code(400).send();
  }
  reply.code(201).send(rmPasswordFromRes(newUser));
}

const updateUserByIdHandler = async(req, reply) => {
  const user = req.body;
  const { id } = req.params;
  const updatedUser = await updateUserById(user,id);
  if(!updatedUser) {
    reply.code(400).send();
  }
  reply.code(200).send(rmPasswordFromRes(updatedUser));
}

const deleteUserByIdHandler = async(req, reply) => {
  const { id } = req.params;
  const isDeleted = await deleteUserById(id);
  if(!isDeleted) {
    reply.code(401).send();
  }
  reply.code(204).send();
}

module.exports = { getAllUsersHandler,getUserByIdHandler,createUserHandler,updateUserByIdHandler,deleteUserByIdHandler };