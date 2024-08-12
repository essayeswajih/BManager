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
onSortChange($event: Event) {
throw new Error('Method not implemented.');
}
onSearchChange($event: Event) {
throw new Error('Method not implemented.');
}
  clientForm !:FormGroup;
  clientList:any[] = [];
  constructor(private fb :FormBuilder ,private tstr:ToastrService,private ste:SteService){
    this.clientForm = fb.group({
      'ClientName': [''],
      'trans':['All']
    })
  }
  ngOnInit(){
    this.ste.getClients().then(
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
