import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SteService } from '../../../apiServices/ste/ste.service';

@Component({
  selector: 'app-blv',
  templateUrl: './blv.component.html',
  styleUrl: './blv.component.scss'
})
export class BlvComponent {
  bonForm !:FormGroup;
  bonList:any[] = [];
  constructor(private fb :FormBuilder ,private tstr:ToastrService,private ste:SteService){
    this.bonForm = fb.group({
      'ClientName': [''],
      'trans':['All']
    })
  }
  ngOnInit(){
    this.ste.getBonLivV().then(
      (data:any)=>{
        if (data.​status==200){
          console.log(data)
          this.bonList=data.data;
        }
      }
    ).catch(
      (error:any)=>{
        this.tstr.error("INTERNAL SERVER ERROR","ERROR")
      }
    )
  }

}
