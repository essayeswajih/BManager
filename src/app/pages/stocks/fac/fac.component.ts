import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SteService } from '../../../apiServices/ste/ste.service';

@Component({
  selector: 'app-fac',
  templateUrl: './fac.component.html',
  styleUrl: './fac.component.scss'
})
export class FacComponent {

  filteredBons: any[] = [];
  searchQuery: string = '';
  sortBy: string = '0';
  bonForm !:FormGroup;
  bonList:any[] = [];
  paymentList:any[] = [
    'Non payé',
    'Espèce',
    'Chèque',
    'Virement',
    'Traite',
  ]

  isActive: boolean = false;
  selectedBonLiv:any={};
  
  constructor(private fb :FormBuilder ,private tstr:ToastrService,private ste:SteService){
    this.bonForm = fb.group({
      'ClientName': [''],
      'trans':['All'],
      'dateStart': [''],
      'dateEnd': [''],
    })
  }
  ngOnInit(){
    this.ste.getAllAFactures().then(
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
    this.applyFilters();
  }
  onSortChange1(): void {
    this.applyFilters();
  }
  private applyFilters(): void {
    let filtered = this.bonList.filter(bon =>
      (bon.fournisseur?.intitule || '').toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    const dateStart = this.bonForm.get('dateStart')?.value;
    const dateEnd = this.bonForm.get('dateEnd')?.value;

    if (dateStart) {
      filtered = filtered.filter(bon => new Date(bon.dateCreation) >= new Date(dateStart));
    }

    if (dateEnd) {
      filtered = filtered.filter(bon => new Date(bon.dateCreation) <= new Date(dateEnd));
    }

    switch (this.sortBy) {
      case '0':
        filtered.sort((a, b) => (a.dateCreation || '').localeCompare(b.dateCreation || ''));
        break;
      case '1':
        filtered.sort((a, b) => (a.fournisseur?.intitule|| '').localeCompare(b.fournisseur?.intitule || ''));
        break;
      case '2':
        filtered.sort((a, b) => a.payment.localeCompare(b.payment));
        break;
      case '3':
        filtered.sort((a, b) => Number(a.payed) - Number(b.payed));
        break;
      default:
        break;
    }

    this.filteredBons = filtered;
  }
  Active(){
    this.isActive = ! this.isActive;
  }
  
  select(bonLiv:any) {
    this.selectedBonLiv=bonLiv;
    this.Active();
  }
  change(item: any, key: string, event?: Event) {
    if (key === 'payed') {
      const isChecked = (event?.target as HTMLInputElement).checked;
      console.log(item);
      console.log(isChecked);
      if(isChecked){
        item.payed = isChecked;
        item.payment = this.paymentList[1]
      }else{
        item.payed = isChecked;
        item.payment = this.paymentList[0]
      }
      this.ste.saveFactureA(item).then(
        (response) => {
          if(response?.id){
            this.tstr.success("Facture changed successfully","success")
          }
        }
      )
    }
    if(key=='payment'){
      const selectedIndex = (event?.target as HTMLInputElement).value;
      console.log(item);
      console.log(selectedIndex);
      if(item.payed){
        item.payment = selectedIndex;
        if(selectedIndex === 'Non payé'){
          item.payed = false
        }else if(selectedIndex !== 'Non payé'){
          item.payed = true
        }
        console.log(item)
        this.ste.saveFactureA(item).then(
          (response) => {
            if(response?.id){
              this.tstr.success("Facture changed successfully","success")
            }
          }
        )
      }else{
        item.payment = 'Non payé';
        this.ste.saveFactureA(item).then(
          (response) => {
            if(response?.id){
              this.tstr.success("Facture changed successfully","success")
            }
          }
        )
      }
    }
  }
  down(id:number) {
    this.ste.download(`factureAchat${id}.pdf`)
  }
}
