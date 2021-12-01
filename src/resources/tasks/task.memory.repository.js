
const { v4: uuidv4 } = require('uuid');
const {taskStore} = require('../../db/store');

const getAllTasks = async(boardId) => taskStore.filter(task => task.boardId === boardId);

const getTaskById = async(boardId, taskId) => taskStore.find(task => task.id === taskId)

const createTask = async(task, boardId) => {
  console.log(`boardId:${boardId}`);
  console.dir(task);
  const newTask = { ...task, id: uuidv4(), boardId };
  console.dir(newTask);
  if(!newTask.userId) {newTask.userId = null}
  taskStore.push(newTask);
  return newTask;
}

const updateTaskById = (task, boardId, taskId) => {
  const index = taskStore.findIndex(item => item.id === taskId && item.itaskId === boardId);
  let updatedTask;
  if (index !== -1) {
    updatedTask = { ...taskStore[index], ...task };
    taskStore.splice(index, 1, updatedTask);
  }
  return updatedTask;
}

const deleteTaskById = async(boardId, taskId) => {
  console.log(`taskId: ${taskId}, boardId:${boardId}`);
  const index = taskStore.findIndex(task => task.id === taskId && task.boardId === boardId );
  console.log(`index: ${index}`);
  if (index === -1) {
    return false;
  }
  return taskStore.splice(index, 1)[0];
}

module.exports = {getAllTasks, getTaskById, createTask, updateTaskById, deleteTaskById};



