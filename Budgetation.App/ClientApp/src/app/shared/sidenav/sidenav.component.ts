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
        visibility: 'visible'
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
  isOpen = window.innerWidth > 996;

  constructor(private sharedService: SharedService, private hostElement: ElementRef) { }

  ngOnInit(): void {
    this.sharedService.navigationToggled.subscribe(() => {
      this.isOpen = !this.isOpen;
    });

    this.sharedService.screenWidth.subscribe((size: number) => {
      this.isOpen = size > 996;
    });
  }

  toggleNavigation(): void {
    if(this.isOpen && window.innerWidth <= 996){
      this.sharedService.navigationToggle();
    }
  }

}
