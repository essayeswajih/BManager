import { SteService } from './../../../apiServices/ste/ste.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-bon-cmd',
  templateUrl: './bon-cmd.component.html',
  styleUrls: ['./bon-cmd.component.scss']
})
export class BonCmdComponent implements OnInit {
  articleList: any[] = [];
  fournisseurList: any[] = [];
  bonCommandeItems: any = [];
  bonCommandeForm = this.fb.group({
    fournisseur: [0, Validators.required],
    article: [0, Validators.required],
    date: [Date.now(), Validators.required]
  });
  bc!: createBonCommande;

  constructor(private fb: FormBuilder, private steService: SteService) { }

  ngOnInit() {
    this.getArticles();
    this.getFournisseurs();
    this.bc = new createBonCommande(this.bonCommandeForm.value, this.fournisseurList, this.articleList,this.steService);
  }

  async getArticles() {
    try {
      this.articleList = await this.steService.getArticles();
      console.log(this.articleList);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  }

  async getFournisseurs() {
    try {
      this.fournisseurList = await this.steService.getFournisseurs();
      console.log(this.fournisseurList);
    } catch (error) {
      console.error('Error fetching fournisseurs:', error);
    }
  }
}

class createBonCommande {
  private bonCommande: any = {};
  private articlesList: any = [];
  private items: any = []
  private fournisseur: any;
  private steService : SteService

  constructor(formValue: any, fournisseurList: any, articleList: any,steService:SteService) {
    this.fournisseur = fournisseurList[Number(formValue.fournisseur) || 0];
    this.articlesList = articleList;
    this.steService = steService;
  }

  addArticle(articleIndex: any, qte: any, rem: any) {
    let itemCreated = this.createItem(this.articlesList[articleIndex], qte, rem);
    let exist = false;
    for (let item of this.items) {
      if (item.refArticle == this.articlesList[articleIndex].refArticle) {
        item = itemCreated;
        exist = true;
      }
    }
    if (!exist) {
      this.items.push(itemCreated);
    }
  }

  removeArticle(refArticle: any) {
    this.items = this.items.filter((item: { refArticle: any; }) => item.refArticle !== refArticle);
  }

  createItem(article: any, qte?: Number, rem?: Number) {
    let item: any = {};
    item.refArticle = article.refArticle;
    item.designation = article.designation;
    item.unite = article.unite;
    item.puht = article.achatHT;
    item.qte = qte || 1;
    item.rem = rem || 0;
    item.tva = article.tva;
    return item;
  }
  getItems(){
    return this.items
  }
  save(){
    //this.steService.saveBonCommande();
  }
}
