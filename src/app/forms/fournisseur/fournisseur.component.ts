import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SteService } from './../../apiServices/ste/ste.service';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss']
})
export class FournisseurComponent implements OnInit {
  fournisseurForm!: FormGroup;
  fournisseurs: any[] = [];
  fournisseursWithChanges: any[] = [];
  fournisseursUpdated: any[] = [];
  formeJurudiques = [
    "SARL",
    "SUARL",
    "SAS",
    "SA",
    "SNC",
    "EIRL",
    "EURL"
  ];

  constructor(private fb: FormBuilder, private steService: SteService) {
    this.fournisseurForm = this.fb.group({
      intitule: ['', Validators.required],
      matriculeFiscale: ['', Validators.required],
      formeJurudique: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required],
      tel: ['', Validators.required],
      fax: ['', Validators.required],
    });
  }

  async ngOnInit() {
    await this.getFournisseurs();
  }

  async getFournisseurs() {
    this.fournisseurs = await this.steService.getFournisseurs();
    this.fournisseursWithChanges = JSON.parse(JSON.stringify(this.fournisseurs));
    
    console.log(this.fournisseurs);
  }

  async onAdd() {
    if (this.fournisseurForm.valid) {
      await this.steService.saveFournisseur(this.fournisseurForm.value);
      await this.ngOnInit();
    }
  }

  onDelete(id: number) {
    this.steService.deleteFournisseur(id);
    this.fournisseurs = this.fournisseurs.filter(f => f.idFournisseur !== id);
    this.fournisseursWithChanges = this.fournisseursWithChanges.filter(f => f.idFournisseur !== id);
    console.log(this.fournisseurs, 'fournisseurs');
    console.log(this.fournisseursWithChanges, 'fournisseursWithChanges');
    this.updateFournisseursUpdated();
  }

  async onSave() {
    if(this.fournisseursUpdated.length>0){
      await this.steService.saveAllFournisseurs(this.fournisseursUpdated);
      alert('Saved');
      this.fournisseursUpdated = [];
      await this.ngOnInit();
    }
  }

  check(fournisseur: any, event: Event, key: string) {
    if (event) {
      const inputElement = event.target as HTMLInputElement;
      const value = inputElement ? inputElement.value : '';

      // Update fournisseursWithChanges
      for (let f of this.fournisseursWithChanges) {
        if (f.idFournisseur === fournisseur.idFournisseur) {
          if (f[key] !== value) {
            f[key] = value;
          }
          break;
        }
      }

      console.log(this.fournisseurs, 'fournisseurs');
      console.log(this.fournisseursWithChanges, 'fournisseursWithChanges');
      this.updateFournisseursUpdated();
      
    }
  }

  updateFournisseursUpdated() {
    this.fournisseursUpdated = this.fournisseursWithChanges.filter(fw => {
      const found = this.fournisseurs.find(f => f.idFournisseur === fw.idFournisseur);
      return !this.deepEqual(found, fw);
    });
    console.log(this.fournisseursUpdated, 'fournisseursUpdated');
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
