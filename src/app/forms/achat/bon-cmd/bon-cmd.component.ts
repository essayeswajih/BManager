// bon-cmd.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SteService } from './../../../apiServices/ste/ste.service';

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
    date: [this.formatDate(new Date()), Validators.required]
  });
  bc!: createBonCommande;

  constructor(private fb: FormBuilder, private steService: SteService) { }

  ngOnInit() {
    this.getArticles();
    this.getFournisseurs();
    this.bc = new createBonCommande(this.bonCommandeForm.value, this.fournisseurList, this.articleList, this.steService);
  }

  async getArticles() {
    try {
      this.articleList = await this.steService.getArticles();
      console.log('Fetched articles:', this.articleList);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  }

  async getFournisseurs() {
    try {
      this.fournisseurList = await this.steService.getFournisseurs();
      console.log('Fetched fournisseurs:', this.fournisseurList);
    } catch (error) {
      console.error('Error fetching fournisseurs:', error);
    }
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  saveBonCommande() {
    this.bc.save();
  }
}

class createBonCommande {
  private articlesList: any[] = [];
  private items: any[] = [];
  private fournisseur: any;
  private dateCreation: any;
  private steService: SteService;

  constructor(formValue: any, fournisseurList: any[], articleList: any[], steService: SteService) {
    this.fournisseur = fournisseurList[Number(formValue.fournisseur) || 0];
    this.articlesList = articleList;
    this.steService = steService;
    this.dateCreation = formValue.date;
  }

  addArticle(articleIndex: number, qte: number, rem: number) {
    let itemCreated = this.createItem(this.articlesList[articleIndex], qte, rem);
    let exist = false;
    for (let item of this.items) {
      if (item.refArticle === this.articlesList[articleIndex].refArticle) {
        item = itemCreated;
        exist = true;
      }
    }
    if (!exist) {
      this.items.push(itemCreated);
    }
  }

  removeArticle(refArticle: any) {
    this.items = this.items.filter((item) => item.refArticle !== refArticle);
  }

  createItem(article: any, qte: number, rem: number) {
    let item: any = {};
    item.refArticle = article.refArticle;
    item.designation = article.designation;
    item.unite = article.unite;
    item.puht = article.achatHT;
    item.qte = qte || 1;
    item.rem = rem || 0;
    item.tva = article.tva;
    item.totalNet = (article.achatHT - (article.achatHT * rem / 100)) * qte;
    return item;
  }

  getItems() {
    return this.items;
  }

  save() {
    let itemsList: any[] = this.getItems();
    let data: any = {
      fournisseur: { idFournisseur: this.fournisseur.idFournisseur },
      items: []
    };

    for (let i = 0; i < itemsList.length; i++) {
      data.items.push({
        article: { idArticle: itemsList[i].idArticle },
        qte: itemsList[i].qte,
        remise: itemsList[i].rem,
        totalNet: itemsList[i].totalNet
      });
    }

    data.dateCreation = this.dateCreation;

    this.steService.saveBonCommande(data);
  }
}

