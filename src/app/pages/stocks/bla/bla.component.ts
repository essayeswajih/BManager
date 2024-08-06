import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SteService } from '../../../apiServices/ste/ste.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bla',
  templateUrl: './bla.component.html',
  styleUrl: './bla.component.scss'
})
export class BlaComponent {
  bonForm !:FormGroup;
  bonList:any[] = [];
  constructor(private fb :FormBuilder ,private tstr:ToastrService,private ste:SteService){
    this.bonForm = fb.group({
      'ClientName': [''],
      'trans':['All']
    })
  }
  ngOnInit(){
    this.ste.getBonLivA().then(
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
