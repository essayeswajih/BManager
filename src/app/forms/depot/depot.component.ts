import { SteService } from './../../apiServices/ste/ste.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.scss']
})
export class DepotComponent {
  depotForm!: FormGroup;
  depots: any[] = [];
  depotsWithChanges: any[] = [];
  depotsUpdated: any[] = [];

  constructor(private steService: SteService, private fb: FormBuilder) {
    this.depotForm = this.fb.group({
      idDepot: [null,],
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
    });
  }

  async ngOnInit() {
    await this.getDepots();
  }

  async getDepots() {
    this.depots = await this.steService.getDepots();
    this.depotsWithChanges = JSON.parse(JSON.stringify(this.depots));
    console.log(this.depots);
  }

  onDelete(id: number) {
    this.steService.deleteDepots(id);
    this.depots = this.depots.filter(d => d.idDepot !== id);
    this.depotsWithChanges = this.depotsWithChanges.filter(d => d.idDepot !== id);
    console.log(this.depots, 'depots');
    console.log(this.depotsWithChanges, 'depotsWithChanges');
    this.updateDepotsUpdated();
  }

  async onAdd() {
    if (this.depotForm.valid) {
      await this.steService.saveDepots(this.depotForm.value);
      await this.getDepots();
      this.updateDepotsUpdated();
    }
  }

  async onSave() {
    if(this.depotsUpdated.length>0){
      await this.steService.saveAllDepots(this.depotsUpdated);
      alert("Saved");
      this.getDepots();
      this.depotsUpdated=[];
    }

  }

  check(depot: any, event: Event, key: string) {
    if (event) {
      const inputElement = event.target as HTMLInputElement;
      const value = inputElement ? inputElement.value : '';
      console.log(depot, value, key);

      // Update depotsWithChanges
      for (let d of this.depotsWithChanges) {
        if (d.idDepot === depot.idDepot) {
          if (d[key] !== value) {
            d[key] = value;
          }
          break;
        }
      }

      console.log(this.depots, 'depots');
      console.log(this.depotsWithChanges, 'depotsWithChanges');
      this.updateDepotsUpdated();
    }
  }

  updateDepotsUpdated() {
    this.depotsUpdated = this.depotsWithChanges.filter(dw => {
      const found = this.depots.find(d => d.idDepot === dw.idDepot);
      return !this.deepEqual(found, dw);
    });
    console.log(this.depotsUpdated, 'depotsUpdated');
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
