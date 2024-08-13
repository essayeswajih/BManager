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
  filteredClients:any[] = [];
  searchQuery: string = '';
  sortBy: string = '0';

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
          this.filteredClients = this.clientList;
        }
      }
    ).catch(
      (error:any)=>{
        this.tstr.error("INTERNAL SERVER ERROR","ERROR")
      }
    )
  }
  onSearchChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value;
    this.applyFilters();
  }

  onSortChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.sortBy = selectElement.value;
    console.log(this.sortBy);
    this.applyFilters();
  }

  private applyFilters(): void {
    console.log('Search Query:', this.searchQuery);
    let filtered = this.clientList.filter(client =>
      (client.name || '').toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    console.log('Filtered Clients:', filtered);
    switch (this.sortBy) {
      case '3': 
      filtered.sort((a, b) => (a.exonere ? 1 : 0) - (b.exonere ? 1 : 0));
        break;
      case '2': 
      filtered.sort((a, b) => (b.exonere ? 1 : 0)- (a.exonere ? 1 : 0));
        break;
      case '1':
        filtered.sort((a, b) => (a.adresse || '').localeCompare(b.adresse || ''));
        break;
      default:
        filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
    }
  
    this.filteredClients = filtered;
    console.log('Sorted bons:', this.filteredClients);
  }
}
