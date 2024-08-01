import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SteService } from '../../apiServices/ste/ste.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-facture-a',
  templateUrl: './new-facture-a.component.html',
  styleUrl: './new-facture-a.component.scss'
})
export class NewFactureAComponent {
    change(arg0: string,$event: Event) {
    throw new Error('Method not implemented.');
    }
      created :boolean = false;
      idBon : number = 0;
      downloaded : boolean = false;
      fournisseurList:any[]=[];
      articleList:any[]=[];
      items:any[]=[];
      form = this.fb.group({
        fournisseur: [0, Validators.required],
        article: [0, Validators.required],
        date: [new Date(), Validators.required]
      });
      constructor(private ste: SteService,private tsr:ToastrService,private fb:FormBuilder) { }
      async ngOnInit() {
        this.getArticles();
        this.getFournisseurs();
      }
      async getArticles() {
        try {
          this.articleList = await this.ste.getArticles();
          console.log('Fetched articles:', this.articleList);
        } catch (error) {
          console.error('Error fetching articles From new Bon Liv:', error);
        }
      }
    
      async getFournisseurs() {
        try {
          this.fournisseurList = await this.ste.getFournisseurs();
          console.log('Fetched fournisseurs From new Bon Liv:', this.fournisseurList);
        } catch (error) {
          console.error('Error fetching fournisseurs:', error);
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
        item.qte = qte || 1;
        item.rem = rem || 0;
        item.tva = article?.tva;
        item.totalNet = (article?.achatHT - (article?.achatHT * rem / 100)) * qte;
        return item;
      }
      save() {
        let f = this.fournisseurList[this.form.value.fournisseur || 0];
        let dateCreation = this.form.value.date;
        this.ste.saveNewFactureA(this.items,f,dateCreation).then(
          (response) => {
            console.log("xyz",response)
            this.ste.toPdf("achat/facture/toPdf",response).then(
              (response1) => {
                this.idBon = response?.id ;
                this.tsr.success("Facture Crée","success");
                this.created = true;
              },(error)=>{this.tsr.error("Network ERROR !!!","ERROR");}
            )
          }
        );
      }
      
      clear() {
        this.items = [];
        this.created = false;
        this.downloaded = false;
      }
      download(): void {
        const filename = `factureAchat${this.idBon}.pdf`; // Assuming this.getId() returns a valid identifier
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