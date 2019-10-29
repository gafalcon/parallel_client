import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';
import { Observable } from 'rxjs';
import { WorkerNode } from '../models/node';
import { TasksResponse } from '../models/tasksResponse';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
    API_URL = 'http://localhost:7000/api';
    constructor(private http: HttpClient) { }

    getTasks(): Observable<TasksResponse> {
        return this.http.get<TasksResponse>(`${this.API_URL}/tasks`);
    }

    getNodes(): Observable<WorkerNode[]> {
        return this.http.get<WorkerNode[]>(`${this.API_URL}/nodes`);
    }

    newTask(data): Observable<Task> {
        return this.http.post<Task>(`${this.API_URL}/task`, data);
    }
}
