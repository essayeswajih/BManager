import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SteService } from '../../../apiServices/ste/ste.service';

@Component({
  selector: 'app-bon-liv-v',
  templateUrl: './bon-liv-v.component.html',
  styleUrl: './bon-liv-v.component.scss'
})
export class BonLivVComponent {
  devisList: any[] = [];
  form: FormGroup;
  bl:BonLivV = new BonLivV([]);
  constructor(private fb: FormBuilder, private steService: SteService, private toastr: ToastrService) {
    
    this.form = this.fb.group({
      dateCreation: [new Date(), Validators.required],
      bons: [0, Validators.required]
    });
  }
  ngOnInit(): void {
    this.loadDevisList();
  }
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
  supp(devisId: any) {
    this.steService.deleteDevis(devisId).then(
      (res:any) => {
        if(res.status==200){
          this.toastr.success("Delete",devisId+" : Deleted Succesully")
          this.loadDevisList();
        }
        else{
          this.toastr.error("Delete",devisId+" : Not Deleted")
        }
      }
    )}
    
    loadDevisList(): void {
    this.steService.getDevis().then(
      (data: any[]) => {
        console.log(data)
        this.devisList = data;
        this.bl = new BonLivV(data);
      },
      (error) => {
        console.error('Error fetching Devis List:', error);
      }
    );
  }

  change(arg0: string, $event: Event): void {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
  generer(devis:any) {
    let bonLivV :any = {};
    bonLivV.dateCreation=this.form.value.dateCreation;
    bonLivV.devis=devis;
    this.steService.genererBonLivV(bonLivV).then(
      (data: any) => {
        if(data.Response[0].id){
          console.log("bon liv",data);
          console.log(data);
          this.toastr.success('Succès', 'Bon de Livraison Généré');
          this.steService.toPdfx(data.Response[0],"vente/bonLiv/toPdf").then(
            (data)=>{
              if(data=="created"){
                this.bl.setTransferedBon(devis.id);

              }
            }
          );
        }
        else{
          this.toastr.error('Erreur', 'Déjà créé')
        }
        if(data.Response[1]){
          for(let item of data.Response[1]){
            this.toastr.error('The '+item+' store will be finished soon.', 'Alert !!!')
          }
        }
      },
      (error) =>this.toastr.error('Erreur', error)
    );
    console.log("bon to generate",devis)
  }
  download(bonId: any) {
    console.log(bonId);
    const filename = `bonLivVente${bonId}.pdf`; 
    this.steService.downloadFile(filename)
    .then((data: ArrayBuffer) => {
      this.saveFile(data, filename); 
    })
    .catch(error => {
      console.error('Error downloading file:', error);
      // Handle error as needed
    });
    }
    private saveFile(data: ArrayBuffer, filename: string): void {
      const blob = new Blob([data], { type: 'application/pdf' });
  
      // Create a download link
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = filename;
  
      // Append the link to the body and simulate a click
      document.body.appendChild(downloadLink);
      downloadLink.click();
  
      // Clean up
      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(downloadLink.href);
    }
}
class BonLivV{

  private id!: number;
  private bonList:any[] = [];
  constructor(bonList: any[]) {
    this.bonList = bonList;
  }
  public getBonList(){
    return this.bonList;
  }
  setTransferedBon(id: any) {
    let x:any[]=[] ;
        for(let i of this.bonList){
          if(i.id == id){
            i.trans = true;
        }
          x.push(i)
      }
    this.bonList = x;
  }
}
