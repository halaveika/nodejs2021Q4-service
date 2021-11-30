const usersRepo = require('./user.memory.repository');
const {rmPasswordFromRes} = require('../../utils/helper');

const getAllUsersHandler = async(req, reply) => {
  const x = await usersRepo.getAll();
  const resp = x.map(e => rmPasswordFromRes(e))
  reply.send(resp);
}

module.exports = { getAllUsersHandler };