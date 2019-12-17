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
    runningPi = [];
    completedPi = [];
    waitingPi = [];
    runningMs = [];
    completedMs = [];
    waitingMs = [];
    pastPiTasks = [];
    pastMSTasks = [];

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

    filterLists(tasksResponse) {
        this.runningPi = tasksResponse.running.filter((t: any) => t.task_type === 'PI');
        this.completedPi = tasksResponse.completed.filter((t: any) => t.task_type === 'PI');
        this.waitingPi = tasksResponse.waiting.filter((t: any) => t.task_type === 'PI');
        this.runningMs = tasksResponse.running.filter((t: any) => t.task_type !== 'PI');
        this.completedMs = tasksResponse.completed.filter((t: any) => t.task_type !== 'PI');
        this.waitingMs = tasksResponse.waiting.filter((t: any) => t.task_type !== 'PI');
    }

    ngOnInit() {
        this.apiService.getNodes().subscribe(nodes => {
            console.log('Nodes', nodes);
            this.nodes = nodes;
        });

        this.apiService.getTasks().subscribe(tasksResponse => {
            console.log(tasksResponse);
            this.filterLists(tasksResponse);

        });

        this.apiService.getWsConnection().subscribe(
            (res: any) => {
                console.log('WS MESSAGE!!', res);
                if (res.waiting) {
                    this.waitingPi = res.waiting.filter((t: any) => t.task_type === 'PI');
                    this.waitingMs = res.waiting.filter((t: any) => t.task_type !== 'PI');
                } else if (res.running) {
                    this.runningMs = res.running.filter((t: any) => t.task_type !== 'PI');
                    this.runningPi = res.running.filter((t: any) => t.task_type === 'PI');
                } else if (res.completed) {
                    this.completedMs = res.completed.filter((t: any) => t.task_type !== 'PI');
                    this.completedPi = res.completed.filter((t: any) => t.task_type === 'PI');
                } else {
                    this.nodes = res;
                }
                // if (res.running ) {
                //     this.filterLists(res);
                //     this.runningTasks = res.running;
                //     this.completedTasks = res.completed;
                //     this.waitingTasks = res.waiting;
                // } else {
                //     this.nodes = res;
                // }

            },
            err => console.log('WS Error:', err),
            () => console.log()
        );

    }


    onSubmit() {
        console.log(this.form.value);
        if (this.type === 'pi') {
            this.form.get('sortfile').setValue(null);
            this.apiService.newPITask(this.form.value).subscribe((res) => {
                console.log(res);
            });
        } else {
            const sortData = new FormData();
            sortData.append('sortfile', this.form.get('sortfile').value);
            sortData.append('name', this.form.get('name').value);
            this.apiService.newSortTask(sortData).subscribe((res) => {
                console.log('Res', res);
            }, (err) => {
                console.log('Submit err', err);
            });
        }
    }

    getCompletedTasks(taskType: string) {
        if (taskType === 'pi') {
            if (this.pastPiTasks.length === 0) {
                this.apiService.getPastTasks(taskType).subscribe((res: any) => {
                    this.pastPiTasks = res;
                })
            }
        } else {
            if (this.pastMSTasks.length === 0) {
                this.apiService.getPastTasks(taskType).subscribe((res: any) => {
                    this.pastMSTasks = res;
                })
            }
        }
    }
}
