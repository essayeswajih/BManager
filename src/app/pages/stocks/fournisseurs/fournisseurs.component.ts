import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SteService } from '../../../apiServices/ste/ste.service';

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrl: './fournisseurs.component.scss'
})
export class FournisseursComponent {
  filteredFournisseurs: any[] = [];
  searchQuery: string = '';
  sortBy: string = '0';

  clientForm !:FormGroup;
  fournisseurList:any[] = [];
  constructor(private fb :FormBuilder ,private tstr:ToastrService,private ste:SteService){
    this.clientForm = fb.group({
      'ClientName': [''],
      'trans':['All']
    })
  }
  ngOnInit(){
    this.ste.getFournisseurs().then(
      (data:any[])=>{
        if (data.length>0){
          console.log(data)
          this.fournisseurList=data;
          this.filteredFournisseurs = this.fournisseurList;

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
    const searchValue = inputElement.value;
    this.searchQuery = searchValue;
    this.applyFilters();
  }

  onSortChange(event:Event): void {
    const inputElement = event.target as HTMLInputElement;
    const sortValue = inputElement.value;
    this.sortBy = sortValue;
    console.log(this.sortBy)
    this.applyFilters();
  }

  private applyFilters(): void {
    console.log('Search Query:', this.searchQuery);
    let filtered = this.fournisseurList.filter(fournisseur => 
      (fournisseur.intitule || '').toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    console.log('Filtered Articles:', filtered);
    switch (this.sortBy) {
      case '1': 
        filtered.sort((a, b) => (a.adresse || '') - (b.adresse || ''));
        break;
      default:
        filtered.sort((a, b) => (a.intitule || '').localeCompare(b.intitule || ''));
        break;
    }
  
    this.filteredFournisseurs = filtered;
    console.log('Sorted fourniseur:', this.filteredFournisseurs);
  }
}
