import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SteService } from '../../../apiServices/ste/ste.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bon-liv',
  templateUrl: './bon-liv.component.html',
  styleUrls: ['./bon-liv.component.scss']
})
export class BonLivComponent implements OnInit {

  id:number = 0;
  bonCmdList: any[] = [];
  form: FormGroup;
  bl:BonLivA = new BonLivA([]);

  constructor(private fb: FormBuilder, private steService: SteService, private toastr: ToastrService) {
    
    this.form = this.fb.group({
      dateCreation: [new Date(), Validators.required],
      bons: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadBonCmdList();
  }
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
  supp(idBonLiv: any) {
    this.steService.deleteBonCommande(idBonLiv).then(
      (res) => {
        if(res==true){
          this.toastr.success("Delete",idBonLiv+" : Deleted Succesully")
          this.loadBonCmdList();
        }
        else{
          this.toastr.error("Delete",idBonLiv+" : Not Deleted")
        }
      }
    )}
    
  loadBonCmdList(): void {
    this.steService.getAllBonCmdA().then(
      (data: any[]) => {
        this.bonCmdList = data;
        this.bl = new BonLivA(data);
      },
      (error) => {
        console.error('Error fetching Bon Cmd List:', error);
      }
    );
  }

  change(arg0: string, $event: Event): void {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
  generer(bon:any) {
    let bonCmd :any = {};
    bonCmd.date=this.form.value.dateCreation;
    bonCmd.bon=bon;
    this.steService.genererBonLiv(bonCmd).then(
      (data: any) => {
        
        if(data.id){
          console.log("bon liv",data);
          console.log(data);
          this.toastr.success('Succès', 'Bon de Livraison Généré');
          this.bl.setCreated(bon.id,data.id);
          this.steService.toPdfx(data,"achat/bonLiv/toPdf").then(
            (data)=>{
              if(data=="created"){
                this.bl.setTransferedBon(bon.id);

              }
            }
          );
        }
        else{
          this.toastr.error('Erreur', 'Déjà créé')
        }

      },
      (error) =>this.toastr.error('Erreur', error)
    );
    console.log("bon to generate",bon)
  }
  download(bonId: any) {
    console.log(bonId);
    const filename = `bonLivAchat${bonId}.pdf`; // Assuming this.getId() returns a valid identifier
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

class BonLivA{

  private id!: number;
  private bonList:any[] = [];
  constructor(bonList: any[]) {
    this.bonList = bonList;
  }
  public getBonList(){
    return this.bonList;
  }
  setCreated(id: any,idbonLiv:any) {
    let x:any[]=[] ;
        for(let i of this.bonList){
          if(i.id == id){
            i.idbonLiv=idbonLiv;
        }
          x.push(i)
      }
    this.bonList = x;
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