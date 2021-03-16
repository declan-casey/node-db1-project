const db = require('../../data/db-config.js')

const getAll = () => {
  // DO YOUR MAGIC
  return db('budget')
}

const getById = id => {
  // DO YOUR MAGIC
  return db('budget').where("id", id).first()
}

const create = async account => {
  // DO YOUR MAGIC
  const [id] = await db('budget').insert(account, ['id', 'name', 'budget']) 
  return getById(id)
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  
}

const deleteById = async id => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
