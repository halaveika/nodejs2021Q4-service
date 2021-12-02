const deletTasksWithBoard = (taskStore,id) => {
  for (let i = taskStore.length - 1; i >= 0; i -= 1) {
    if (taskStore[i].boardId === id) {
      taskStore.splice(i, 1);
    }
  }
}

const userIdToNull = (taskStore,id) => {
   /* eslint-disable */ 
   taskStore.forEach(task => {if (task.userId === id) {task.userId = null}});
   /* eslint-enable */ 
}

module.exports = {deletTasksWithBoard,userIdToNull}