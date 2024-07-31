import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SteService } from '../../apiServices/ste/ste.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-bon-liv-v',
  templateUrl: './new-bon-liv-v.component.html',
  styleUrl: './new-bon-liv-v.component.scss'
})
export class NewBonLivVComponent {
  changeComponent(n: number) {
    if(this.componentName==1){
      this.componentName=0;
    }else{
      this.componentName=n;
    }
  }
  componentName: number = 1;
    download() {
    throw new Error('Method not implemented.');
    }
    change(arg0: string,$event: Event) {
    throw new Error('Method not implemented.');
    }
    
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
              i.totalNet = (i.article?.venteHT - (i.article?.venteHT * i.rem / 100)) * i.qte;
              i.totalTTC = i.totalNet + i.totalNet * i.tva / 100;
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
        item.rem = rem;
        item.tva = article?.tva;
        item.totalNet = (article.venteHT - (article.venteHT * rem / 100)) * qte;
        item.totalTTC = item.totalNet + item.totalNet * item.tva / 100;
        return item;
      }
      save() {
        let f = this.fournisseurList[this.form.value.fournisseur || 0];
        let dateCreation = this.form.value.date;
        this.ste.saveNewBonLivV(this.items,f,dateCreation).then(
          (response) => {
            this.tsr.success("Bon de Livraison Crée","success")
          }
        );
        this.items = [];
      }
    }