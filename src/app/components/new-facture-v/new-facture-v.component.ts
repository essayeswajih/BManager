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

    download() {
    throw new Error('Method not implemented.');
    }
    change(arg0: string,$event: Event) {
    throw new Error('Method not implemented.');
    }
    
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
        let item = this.createItem(article,1,0);
        console.log(item)
        this.items.push(item)
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
        let f = this.clientList[this.form.value.client || 0];
        let dateCreation = this.form.value.date;
        this.ste.saveNewFactureV(this.items,f,dateCreation).then(
          (data) => {
            if(data.Response[0]){
                this.tsr.success("Bon de Livraison Crée","success");
            }
            
            if(data.Response[1]){
              for(let item of data.Response[1]){
                this.tsr.error('The '+item+' store will be finished soon.', 'Alert !!!')
              }
            }
          }
        );
      }
    }
