import { SteService } from './../../../apiServices/ste/ste.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrl: './facture.component.scss'
})
export class FactureComponent {
  f:Facture = new Facture([],this.steService);
  constructor(private steService: SteService){}

  ngOnInit(){
    this.steService.getBonLivA().then(
      (data:any)=>{
        if (data.​status==200){
          console.log(data.data)
          this.f.setBonList(data.data)
        }
        
      }
    );
  }

}
class Facture {
  private steService!: SteService;
  private bonLivList:any[];
  private bonLivSelected:any[]=[];
  constructor(bonLivList:any,steService: SteService) {
    this.bonLivList=bonLivList;
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
        this.bonLivSelected.push(this.getBonById(bonId));
        console.log(this.bonLivSelected)
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
  generer(){
    this.steService.genererFactureA(this.bonLivSelected)
  }
  supp(){
    this.bonLivSelected = [];
  }
}
