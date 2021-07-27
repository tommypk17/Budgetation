import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostBinding, HostListener, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        visibility: 'visible',
        width: '40%',
      })),
      state('closed', style({
        visibility: 'hidden',
        width: '0%',
      })),
      transition('open => closed', [
        animate('75ms')
      ]),
      transition('closed => open', [
        animate('75ms')
      ]),
    ]),
  ]
})
export class SidenavComponent implements OnInit {
  @HostBinding('attr.tabindex') tabindex = '-1';
  isOpen = false;

  constructor(private sharedService: SharedService, private hostElement: ElementRef) { }

  ngOnInit(): void {
    this.sharedService.navigationToggled.subscribe(() => {
      this.isOpen = !this.isOpen;
    });
  }

  toggleNavigation(): void {
    if(this.isOpen){
      this.sharedService.navigationToggle();
    }
  }

}
