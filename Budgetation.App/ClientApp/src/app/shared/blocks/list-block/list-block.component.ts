import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-list-block',
  templateUrl: './list-block.component.html',
  styleUrls: ['./list-block.component.scss']
})
export class ListBlockComponent implements OnInit {

  @Input('tasklistID') id: string;
  @Input('tasklistLink') link: string;
  @Input('tasklistTitle') title: string;
  @Input('tasklistSubtitle') subtitle: string;
  @Input('tasklistContent') content: string;

  @Output() taskListDeleted  = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
  }

  deleteTaskList(id: string){
    this.taskListDeleted.emit(id);
  }

}

export interface TaskList {
  id: string;
  link?: string;
  title: string;
  subtitle?: string;
  content?: string;
}
