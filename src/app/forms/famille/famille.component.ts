import { SteService } from './../../apiServices/ste/ste.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-famille',
  templateUrl: './famille.component.html',
  styleUrls: ['./famille.component.scss']
})
export class FamilleComponent implements OnInit {
  familleForm!: FormGroup;
  familles: any[] = [];
  famillesWithChanges: any[] = [];
  famillesUpdated: any[] = [];
  allDepots: any[] = [];

  constructor(private fb: FormBuilder, private steService: SteService,private tstr:ToastrService) {
    this.familleForm = this.fb.group({
      idDepot: ['', Validators.required],
      nomFamille: ['', Validators.required],
      adresse: ['', Validators.required],
    });
  }

  async ngOnInit() {
    await this.getFamilles();
    this.allDepots = await this.steService.getDepots();
  }

  async getFamilles() {
    this.familles = await this.steService.getFamilles();
    this.famillesWithChanges = JSON.parse(JSON.stringify(this.familles));
    console.log(this.familles);
  }

  async onAdd() {
    console.log(this.familleForm.value);
    if (this.familleForm.valid) {
      let famille: any = {
        nomFamille: this.familleForm.value.nomFamille,
        adresse: this.familleForm.value.adresse,
        depot: { idDepot: Number(this.familleForm.value.idDepot) }
      };
      await this.steService.saveFamille(famille).then(
        (response) => {
          this.tstr.success('Famille ajoutée avec succès');
        }
      ).catch(
        (error) => { this.tstr.error("INTERNAL SERVER ERROR","ERROR")}
      );
      await this.ngOnInit();
    }
  }

  onDelete(id: number) {
    console.log(id);
    this.steService.deleteFamille(id);
    this.familles = this.familles.filter(d => d.idFamille !== id);
    this.famillesWithChanges = this.famillesWithChanges.filter(d => d.idDepot !== id);
    console.log(this.familles, 'famille');
    console.log(this.famillesWithChanges, 'famillesWithChanges');
  }

  async onSave() {
    if(this.famillesUpdated.length>0){
      await this.steService.saveAllFamille(this.famillesUpdated);
      alert('Saved');
      await this.ngOnInit();
      this.famillesUpdated = [];
    }

  }

  check(depot: any, event: Event, key: string) {
    if (event) {
      const inputElement = event.target as HTMLInputElement;
      const value = inputElement ? inputElement.value : '';

      // Update famillesWithChanges
      for (let f of this.famillesWithChanges) {
        if (f.idFamille === depot.idFamille) {
          if(key=='depot'){
            for(let d of this.allDepots){
              if(d.idDepot==Number(value)){
                f.depot = d;
              }
            }

          }
          else if (f[key] !== value) {
            f[key] = value;
            console.log(key,value)
          }
          break;
        }
      }

      console.log(this.familles, 'familles');
      console.log(this.famillesWithChanges, 'famillesWithChanges');
      this.updateFamillesUpdated();
    }
  }

  updateFamillesUpdated() {
    this.famillesUpdated = this.famillesWithChanges.filter(fw => {
      const found = this.familles.find(f => f.idFamille === fw.idFamille);
      return !this.deepEqual(found, fw);
    });
    console.log(this.famillesUpdated, 'famillesUpdated');
  }

  deepEqual(obj1: any, obj2: any): boolean {
    if (obj1 === null || obj1 === undefined || obj2 === null || obj2 === undefined) {
      return obj1 === obj2;
    }
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
      return obj1 === obj2;
    }
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let key of keys1) {
      if (!this.deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }
    return true;
  }
}
