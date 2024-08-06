import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SteService } from '../../../apiServices/ste/ste.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent {
  clientForm !:FormGroup;
  clientList:any[] = [];
  constructor(private fb :FormBuilder ,private tstr:ToastrService,private ste:SteService){
    this.clientForm = fb.group({
      'ClientName': [''],
      'trans':['All']
    })
  }
  ngOnInit(){
    this.ste.getBonLivV().then(
      (data:any)=>{
        if (data.​status==200){
          console.log(data)
          this.clientList=data.data;
        }
      }
    ).catch(
      (error:any)=>{
        this.tstr.error("INTERNAL SERVER ERROR","ERROR")
      }
    )
  }
}
