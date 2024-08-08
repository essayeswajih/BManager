import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SteService } from '../../apiServices/ste/ste.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';

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
  onClick() {
    if (this.search.valid) {
      this.tstr.success(' form correctly.');
      this.ste.getBonLivVById(this.search.value.id).then(
        (data)=>{
          console.log("data",data);
        }
      ).catch(
        (error)=>console.log(error)
      );

    } else {
      this.tstr.warning('Please fill out the form correctly.');
    }
  }
}

