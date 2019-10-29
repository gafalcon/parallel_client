import { Task } from './task';

export class TasksResponse {

    constructor(
        public running: Task[],
        public completed: Task[],
        public waiting: Task[]
    ) {

    }

}
