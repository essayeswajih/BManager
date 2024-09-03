import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SteService } from '../../../apiServices/ste/ste.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bla',
  templateUrl: './bla.component.html',
  styleUrl: './bla.component.scss'
})
export class BlaComponent {
  filteredBons: any[] = [];
  searchQuery: string = '';
  sortBy: string = '0';
  bonForm !:FormGroup;
  bonList:any[] = [];

  isActive: boolean = false;
  selectedBonLiv:any={};
  
  constructor(private fb :FormBuilder ,private tstr:ToastrService,private ste:SteService){
    this.bonForm = fb.group({
      'ClientName': [''],
      'trans':['All']
    })
  }
  ngOnInit(){
    this.ste.getBonLivA().then(
      (data:any)=>{
        if (data.​status==200){
          console.log(data)
          this.bonList=data.data;
          this.filteredBons = this.bonList;
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
    let filtered = this.bonList.filter(bon =>
      (bon.fournisseur?.intitule || '').toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    console.log('Filtered Articles:', filtered);
    switch (this.sortBy) {
      case '0': 
        filtered.sort((a, b) => (a.dateCreation || '').localeCompare(b.dateCreation || ''));
        break;
      case '2':
        filtered.sort((a, b) => (a.trans ? 1 : 0) - (b.trans ? 1 : 0));
        break;
      case '3':
        filtered.sort((a, b) => (a.trans ? 1 : 0) - (b.trans ? 1 : 0));
        break;
      default:
        filtered.sort((a, b) => (a.fournisseur?.intitule || '').localeCompare(b.fournisseur?.intitule || ''));
        break;
    }
  
    this.filteredBons = filtered;
    console.log('Sorted bons:', this.filteredBons);
  }
  Active(){
    this.isActive = ! this.isActive;
  }
  
  select(bonLiv:any) {
    this.selectedBonLiv=bonLiv;
    this.Active();
  }
  down(id:number) {
    this.ste.download(`bonLivAchat${id}.pdf`)
  }
}
