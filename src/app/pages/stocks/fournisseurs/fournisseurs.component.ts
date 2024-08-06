import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SteService } from '../../../apiServices/ste/ste.service';

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrl: './fournisseurs.component.scss'
})
export class FournisseursComponent {
  clientForm !:FormGroup;
  clientList:any[] = [];
  constructor(private fb :FormBuilder ,private tstr:ToastrService,private ste:SteService){
    this.clientForm = fb.group({
      'ClientName': [''],
      'trans':['All']
    })
  }
  ngOnInit(){
    this.ste.getFournisseurs().then(
      (data:any[])=>{
        if (data.length>0){
          console.log(data)
          this.clientList=data;
        }
      }
    ).catch(
      (error:any)=>{
        this.tstr.error("INTERNAL SERVER ERROR","ERROR")
      }
    )
  }
}
