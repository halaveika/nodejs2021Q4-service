const rmPasswordFromRes = (obj) =>  {
  const { id, name, login } = obj;
  return { id, name, login }
}

module.exports = { rmPasswordFromRes };