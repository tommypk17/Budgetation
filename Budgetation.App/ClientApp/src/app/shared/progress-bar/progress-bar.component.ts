import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  public loading: boolean = true;

  constructor(private ref: ChangeDetectorRef, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.ref.detach();
    this.sharedService.loading.subscribe((res: boolean) => {
      this.loading = res;
      this.ref.detectChanges();
    });
  }

}
