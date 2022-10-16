import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-what-if',
  templateUrl: './what-if.component.html',
  styleUrls: ['./what-if.component.scss']
})
export class WhatIfComponent implements OnInit {
  headerBlock = {blockTitle: "Budgets - What-If", blockSubtitle: "", blockContent: ""};

  constructor() { }

  ngOnInit(): void {
  }

}
