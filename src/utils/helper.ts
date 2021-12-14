import  {Task}  from "../types/Task.type";

/**
 * Delete all task from task store with current boardId
 * @param taskStore - store of Tasks
 * @param id - boardId of deleted tasks
 */
export const deletTasksWithBoard = (taskStore:Task[],id:string):void => {
  for (let i = taskStore.length - 1; i >= 0; i -= 1) {
    if (taskStore[i]!.boardId! === id) {
      taskStore.splice(i, 1);
    }
  }
}

/**
 * Change key userId of tasks to null by current id of deleted User in task store
 * @param taskStore - store of Tasks
 * @param id - value of userId for tasks that should change to null
 */
export const userIdToNull = (taskStore:Task[],id:string):void => {
   taskStore.forEach((task,index) => {if (task.userId === id) {
    const markNullTask = {...task, userId: null }
    taskStore.splice(index, 1, markNullTask);
    }});
}
