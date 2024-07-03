import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  isSticky = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Logic to determine if navbar should be sticky based on scroll position
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isSticky = offset > 50; // Adjust 50 to your desired offset threshold
  }


}
