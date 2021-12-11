import { User } from "../types/User.type";
import {Task}  from "../types/Task.type";
import { Board } from "../types/Board.type";

export const userStore:User[] = [
 {
   id: 'e4727e7d-0731-4eca-ae7b-f669923f746c',
   name: 'Alex',
   login: 'Alex123',
   password: 'uhyags8d924yhhA'
 },
 {
   id: 'c791020a-7c3a-418d-8880-ed4a9618f0a8',
   name: 'Olya',
   login: 'Olya123',
   password: 'ugsgs892f4yhhA'
 },
 {
   id: 'af568d5e-4656-4e59-b4a2-625d2bd66aa2',
   name: 'Petya',
   login: 'Petya123',
   password: 'uhfffffgyags8924yhhA'
 }
]

export const boardStore:Board[] = [
  {
    id: 'f40fe24a-8e8b-4578-bae1-eb375bb1e48f',
    title: 'homework',
    columns: [ { title: 'nodejs task 4', order: 1 }]
}

]

export const taskStore:Task[] = [
  {
  id: '3261d033-f73c-407d-8342-fb7dff401203',
  title: 'nodejs task 4',
  order: 1,
  description: 'you should make your rest-service api',
  userId: 'e4727e7d-0731-4eca-ae7b-f669923f746c', // assignee
  boardId: 'f40fe24a-8e8b-4578-bae1-eb375bb1e48f',
  columnId: '0ab280dc-fd9f-4973-861b-53d065d92e1a',
}

]


