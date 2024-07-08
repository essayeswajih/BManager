import { SteService } from './../../apiServices/ste/ste.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  clientForm!: FormGroup;
  clients: any[] = [];
  clientsWithChanges: any[] = [];
  clientsUpdated: any[] = [];

  constructor(private steService: SteService, private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      idClient: [null],
      name: ['', Validators.required],
      matriculeFiscale: ['', Validators.required],
      email: ['', Validators.required],
      adresse: ['', Validators.required],
      tel: ['', Validators.required],
      fax: ['', Validators.required],
      exonere:['',Validators.required],
    });
  }

  async ngOnInit() {
    await this.getClients();
  }

  async getClients() {
    this.clients = await this.steService.getClients();
    this.clientsWithChanges = JSON.parse(JSON.stringify(this.clients));
    console.log(this.clients);
  }

  async onDelete(id: number) {
    await this.steService.deleteClients(id);
    this.clients = this.clients.filter(c => c.idClient !== id);
    this.clientsWithChanges = this.clientsWithChanges.filter(c => c.idClient !== id);
    console.log(this.clients, 'clients');
    console.log(this.clientsWithChanges, 'clientsWithChanges');
    this.updateClientsUpdated();
  }

  async onAdd() {
    if (this.clientForm.valid) {
      await this.steService.saveClients(this.clientForm.value);
      await this.getClients();
      this.updateClientsUpdated();
      this.clientForm.reset();
    }
  }

  async onSave() {
    if (this.clientsUpdated.length > 0) {
      await this.steService.saveAllClients(this.clientsUpdated);
      alert('Saved');
      await this.getClients();
      this.clientsUpdated = [];
    }
  }

  check(client: any, event: Event, key: string) {
    if (event) {
      const inputElement = event.target as HTMLInputElement;
      const value = inputElement ? inputElement.value : '';
      console.log(client, value, key);

      // Update clientsWithChanges
      for (let c of this.clientsWithChanges) {
        if (c.idClient === client.idClient) {
          if(key=='exonere'){
            c[key] = !c[key];
          }
          else if (c[key] !== value) {
            c[key] = value;
          }
          break;
        }
      }

      console.log(this.clients, 'clients');
      console.log(this.clientsWithChanges, 'clientsWithChanges');
      this.updateClientsUpdated();
    }
  }

  updateClientsUpdated() {
    this.clientsUpdated = this.clientsWithChanges.filter(cw => {
      const found = this.clients.find(c => c.idClient === cw.idClient);
      return !this.deepEqual(found, cw);
    });
    console.log(this.clientsUpdated, 'clientsUpdated');
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
