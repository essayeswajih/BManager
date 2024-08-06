import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SteService } from '../../../apiServices/ste/ste.service';

@Component({
  selector: 'app-facture-v',
  templateUrl: './facture-v.component.html',
  styleUrl: './facture-v.component.scss'
})
export class FactureVComponent {
  f:Facture = new Facture([],this.steService,this.toastr);
  form :FormGroup;
  constructor(private fb: FormBuilder,private steService: SteService,private toastr :ToastrService){
    this.form = this.fb.group({
      dateCreation: [new Date(), Validators.required],
      bons: [0, Validators.required]
    });
  }
  
  ngOnInit(){
    this.steService.getBonLivV().then(
      (data:any)=>{
        if (data.​status==200){
          console.log(data.data)
          this.f = new Facture(data.data,this.steService,this.toastr)
        }
      }
    );
  }
  generer(){
    this.f.generer(this.form.value.dateCreation)
  }

}
class Facture {
  private steService!: SteService;
  private bonLivList:any[];
  private bonLivSelected:any[]=[];
  private toastr !:ToastrService;
  constructor(bonLivList:any,steService: SteService,toastr :ToastrService) {
    this.bonLivList=bonLivList;
    this.steService=steService;
    this.toastr = toastr;
  }
  getBonList(){
    return this.bonLivList;
  }
  getBonById(id:any){
    return this.bonLivList.find((item)=>item.id==id);
  }
  setBonList(list:any){
    this.bonLivList = list;
  }
  exist(id:any,list:any){
    if (list.length>0){ 
      for (let i=0;i<list.length;i++){
        if (list[i].id===id){
          return i;
        }
      }
    }
    return -1;
  }
  clearList(list:any[]){
    let newList=[];
    for (let i=0;i<list.length;i++){
      if (list[i]!=null){
        newList.push(list[i]);
      }
    }
    return newList;
  }
  select(bonId:any,e:Event) {
    let value = e.target as HTMLInputElement;
    
    if (value.checked) {
      if (this.exist(bonId,this.bonLivSelected)<0){
        if(this.bonLivSelected.length>0){
          if(this.bonLivSelected[this.bonLivSelected.length-1].client.idClient!=this.getBonById(bonId).client.idClient){
          this.toastr.error("Il foux choisir la meme client","ERROR")
          value.checked=false;
          }else{
            this.bonLivSelected.push(this.getBonById(bonId));
            console.log(this.bonLivSelected)
            this.toastr.success("Bon de livraison Selectionné","SUCCESS")
            
          }
        }
        else{
          this.bonLivSelected.push(this.getBonById(bonId));
          console.log(this.bonLivSelected)
          this.toastr.success("Bon de livraison Selectionné","SUCCESS")
          
        }
      }
    }
    else {
      console.log(this.exist(bonId,this.bonLivSelected))
      if (this.exist(bonId,this.bonLivSelected)>=0){
        this.bonLivSelected[this.exist(bonId,this.bonLivSelected)]=null;
        this.bonLivSelected=this.clearList(this.bonLivSelected);
        console.log(this.bonLivSelected)
      }
    }
  }
  generer(date:any){
    this.steService.genererFactureV(this.bonLivSelected,date)
  }
  supp(){
    this.bonLivSelected = [];
  }
}

