export { getTasks, getTask, postTask, putTask, deleteTask } from './task.service';


function taskRouter(app, options, done) {
  
  app.get('/tasks', getTasks)

  app.get('/tasks/:taskId', getTask)

  app.post('/tasks', postTask)

  app.put('/tasks/:taskId', putTask)

  app.delete('/tasks/:taskId', deleteTask)

  done()
}

export default taskRouter