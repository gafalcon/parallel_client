import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { WorkerNode } from '../models/node';
import { TasksResponse } from '../models/tasksResponse';

type WSMessage = TasksResponse | WorkerNode[];

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    API_URL = 'http://localhost:7000/api';
    WS_URL = 'ws://localhost:7000/api/ws';
    // API_URL = 'http://ec2-3-19-232-127.us-east-2.compute.amazonaws.com:7000/api';
    subject: WebSocketSubject<TasksResponse | WorkerNode[] >;

    constructor(private http: HttpClient) {
        this.subject = webSocket(`${this.WS_URL}`);
    }

    getTasks(): Observable<TasksResponse> {
        return this.http.get<TasksResponse>(`${this.API_URL}/tasks`);
    }

    getNodes(): Observable<WorkerNode[]> {
        return this.http.get<WorkerNode[]>(`${this.API_URL}/nodes`);
    }

    getWsConnection(): WebSocketSubject<TasksResponse | WorkerNode[]> {
        return this.subject;
    }

    newPITask(data): Observable<Task> {
        return this.http.post<Task>(`${this.API_URL}/pitask`, data);
    }

    newSortTask(data: FormData): Observable<Task> {
        return this.http.post<Task>(`${this.API_URL}/sorttask`, data);
    }

}
