import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header-block',
  templateUrl: './header-block.component.html',
  styleUrls: ['./header-block.component.scss']
})
export class HeaderBlockComponent implements OnInit {

  @Input('blockTitle') title: string;
  @Input('blockSubtitle') subtitle: string;
  @Input('blockContent') content: string;
  @Input('blockBackLink') backLink: string;
  @Input('blockAddLink') addLink: string;

  constructor() { }

  ngOnInit(): void {
  }

}
