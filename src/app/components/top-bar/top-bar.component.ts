import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
  constructor(private router :Router){}
  open(url: string) {
    this.router.navigateByUrl(url)
  }

}
