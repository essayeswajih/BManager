import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SteService } from '../../apiServices/ste/ste.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bon-de-retour',
  templateUrl: './bon-de-retour.component.html',
  styleUrl: './bon-de-retour.component.scss'
})
export class BonDeRetourComponent {
  search!:FormGroup;
  bon:any = {};
  constructor(private fb:FormBuilder,private ste:SteService,private tstr:ToastrService){
    this.search = this.fb.group({
      'id': ['',Validators.required],
    })
  }
}
