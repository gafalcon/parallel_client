import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mergesort-task-list',
  templateUrl: './mergesort-task-list.component.html',
  styleUrls: ['./mergesort-task-list.component.css']
})
export class MergesortTaskListComponent implements OnInit {

    @Input() tasks = [];
    @Input() title: string;
    constructor() { }

    ngOnInit() {
    }

}
