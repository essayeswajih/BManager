import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mes-donee',
  templateUrl: './mes-donee.component.html',
  styleUrl: './mes-donee.component.scss'
})
export class MesDoneeComponent {
  @Input() pageName: string = '';
}
