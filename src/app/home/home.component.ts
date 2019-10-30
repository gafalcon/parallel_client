import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { WorkerNode } from '../models/node';
import { Task } from '../models/task';
import { TasksResponse } from '../models/tasksResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    form: FormGroup;
    nodes: WorkerNode[];
    runningTasks: Task[];
    completedTasks: Task[];
    waitingTasks: Task[];

    constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
        this.form = this.formBuilder.group({
            name: [''],
            type: [''],
            num_experiments:  [''],
            sortfile: ['']
        });

    }

    get type() { return this.form.get('type').value; }

    fileSelected(files: FileList) {
        if (files.length === 0) {
            return;
        }
        this.form.get('sortfile').setValue(files[0]);
    }

    ngOnInit() {
        this.apiService.getNodes().subscribe(nodes => {
            console.log('Nodes', nodes);
            this.nodes = nodes;
        });

        this.apiService.getTasks().subscribe(tasksResponse => {
            console.log(tasksResponse);
            this.runningTasks = tasksResponse.running;
            this.completedTasks = tasksResponse.completed;
            this.waitingTasks = tasksResponse.waiting;

        });

        this.apiService.getWsConnection().subscribe(
            (res: any) => {
                console.log('WS MESSAGE!!', res);
                if (res.running ) {
                    this.runningTasks = res.running;
                    this.completedTasks = res.completed;
                    this.waitingTasks = res.waiting;
                } else {
                    this.nodes = res;
                }

            },
            err => console.log('WS Error:', err),
            () => console.log()
        );

    }


    onSubmit() {
        console.log(this.form.value);
        this.apiService.newTask(this.form.value).subscribe((res) => {
            console.log(res);
        });
    }
}
