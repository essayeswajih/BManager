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
  bon :any= {};
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
          if(data){
            this.bon = data;
          }
        }
      ).catch(
        (error)=>console.log(error)
      );

    } else {
      this.tstr.warning('Please fill out the form correctly.');
    }
  }
  roundToThreeDecimal(num: number): number {
    return parseFloat(num.toFixed(3));
  }
  change3(item: any,key: string, event:Event) {
    const value = Number((event?.target as HTMLSelectElement).value);
    console.log(value)
    if(value>0){
      for(let i of this.bon.items){
        if(i==item){
          i[key]=value;
          i.totalNet = this.roundToThreeDecimal(i?.newVenteHT - (i?.newVenteHT *  i?.remise  / 100)) * i.qte;
        }
      }
    console.log(this.bon);
    }else{
      this.tstr.error('Veuillez choisir un nombre positif','Error');
    }
  }
  save() {
    if(this.bon?.id != null){
      this.ste.saveBonRetour(this.bon).then(
        (data)=>{
          this.tstr.success("changes saved")
        }
      ).catch(
        (error)=>console.log(error)
      );
    }
  }
  remouve(idItem:number) {
    let list :any = [];
    for(let i of this.bon?.items){
      if(i.id != idItem){
        list.push(i);
      }
    }
    this.bon.items = list;
  }
}

