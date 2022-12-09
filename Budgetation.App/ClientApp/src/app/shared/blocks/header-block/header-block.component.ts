import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from "../../../services/shared.service";

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

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.backLink = this.sharedService.previousRoute;
  }

}
