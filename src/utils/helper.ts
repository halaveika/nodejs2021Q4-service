import  {Task}  from "../types/Task.type";

export const deletTasksWithBoard = (taskStore:Task[],id:string):void => {
  for (let i = taskStore.length - 1; i >= 0; i -= 1) {
    if (taskStore![i].boardId === id) {
      taskStore.splice(i, 1);
    }
  }
}

export const userIdToNull = (taskStore:Task[],id:string):void => {
   taskStore.forEach((task,index) => {if (task.userId === id) {
    const markNullTask = {...task, userId: null }
    taskStore.splice(index, 1, markNullTask);
    }});
}
