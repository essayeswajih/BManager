import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SteService } from '../../apiServices/ste/ste.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-facture-v',
  templateUrl: './new-facture-v.component.html',
  styleUrl: './new-facture-v.component.scss'
})
export class NewFactureVComponent {

    change(arg0: string,$event: Event) {
    throw new Error('Method not implemented.');
    }
      created :boolean = false;
      idBon : number = 0;
      downloaded : boolean = false;
      clientList:any[]=[];
      articleList:any[]=[];
      items:any[]=[];
      form = this.fb.group({
        client: [0, Validators.required],
        article: [0, Validators.required],
        date: [new Date(), Validators.required]
      });
      constructor(private ste: SteService,private tsr:ToastrService,private fb:FormBuilder) { }
      async ngOnInit() {
        this.getArticles();
        this.getClients();
      }
      async getArticles() {
        try {
          this.articleList = await this.ste.getArticles();
          console.log('Fetched articles:', this.articleList);
        } catch (error) {
          console.error('Error fetching articles From new Bon Liv:', error);
        }
      }
    
      async getClients() {
        try {
          this.clientList = await this.ste.getClients();
          console.log('Fetched clients:', this.clientList);
        } catch (error) {
          console.error('Error fetching clients:', error);
        }
      }
      ajouter() {
        let article = this.articleList[this.form.value.article||0];
        if(this.checkArticle(article)){
          let item = this.createItem(article,1,0);
          console.log(item)
          this.items.push(item)
        }else{
          this.tsr.warning("U cant Duplicate an Article","WARN !!")
        }
      }
      checkArticle(article:any){
        for(let item of this.items){
          if(item.article.idArticle == article.idArticle){
            return false;
          }
        }
        return true;
      }
      change3(item: any,key: string, event:Event) {
        const value = Number((event?.target as HTMLSelectElement).value);
        console.log(value)
        if(value>=0){
          for(let i of this.items){
            if(i==item){
              i[key]=value;
              i.totalNet = (i.article?.achatHT - (i.article?.achatHT * i.rem / 100)) * i.qte;
            }
          }
        }else{
          this.tsr.error('Veuillez choisir un nombre positif','Error');
        }
      }
      supprimer(article: any) {
        this.items = this.items.filter(item => item.article != article);
        this.tsr.success('Article Deleted','Success');
      }
      findArticle(id:number){
        return this.items.find(item=>item.idArticle==id);
      }
      findFournisseur(id:number){
        return this.items.find(item=>item.idFournisseur==id);
      }
      createItem(article: any, qte: number, rem: number) {
        let item: any = {};
        item.article = article;
        item.designation = article?.designation;
        item.unite = article?.unite;
        item.puht = article?.achatHT;
        item.venteHT = article.venteHT;  
        item.qte = qte;
        item.remise = rem;
        item.tva = article?.tva;
        item.totalNet = (item.venteHT - (item.venteHT * item.remise / 100)) * qte;
        item.newVenteHT = item.venteHT - (item.venteHT * item.remise / 100);
        item.totalTTC = item.totalNet + item.totalNet * item.tva / 100;
        return item;
      }
      save() {
        let f = this.clientList[this.form.value.client || 0];
        let dateCreation = this.form.value.date;
        this.ste.saveNewFactureV(this.items,f,dateCreation).then(
          (data) => {
            if(data.Response[0]){
              this.ste.toPdf("vente/bonLiv/toPdf",data.Response[0]).then(
                (response1) => {
                  this.idBon = data.Response[0]?.id ;
                  this.tsr.success("Bon de Livraison Crée","success");
                  this.created = true;
                },(error)=>{this.tsr.error("Network ERROR !!!","ERROR");}
              )
          }
            if(data[1]){
              for(let item of data.Response[1]){
                this.tsr.error('The '+item+' store will be finished soon.', 'Alert !!!')
              }
            }
          }
        );
      }
      clear() {
        this.items = [];
        this.created = false;
        this.downloaded = false;
      }
      download(): void {
        const filename = `factureVente${this.idBon}.pdf`; // Assuming this.getId() returns a valid identifier
        this.ste.downloadFile(filename)
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
        
        this.downloaded = true;
        this.idBon = 0;
      }
    }
