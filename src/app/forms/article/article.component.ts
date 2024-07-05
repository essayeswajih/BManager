import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SteService } from './../../apiServices/ste/ste.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  articleForm!: FormGroup;
  articles: any[] = [];
  articlesWithChanges: any[] = [];
  articlesUpdated: any[] = [];
  tvaList = [
    19,13,7
  ];
  unites = [
    'pièce','kg','litre','ml','m','m²','m³','cm','cm²','cm³',
  ];
  devises = [
    'DNT','EUR','USD',
  ];
  familles : any = [];
  fournisseurs : any = [];

  constructor(private fb: FormBuilder, private steService: SteService) {
    this.articleForm = this.fb.group({
      refArticle: ['ART001', Validators.required], // Assuming idDepot is required for an article
      refFournisseur: ['FOUR001', Validators.required],
      fournisseur:['0', Validators.required],
      designation: ['', Validators.required],
      famille:['0', Validators.required],
      model:['', Validators.required],
      achatHT:[0, Validators.required],
      marge:[20,Validators.min(0)],
      montantMarge:[0, Validators.required],
      venteHT:[0, Validators.required],
      fodec:[false, Validators.required],
      tva:['0', Validators.required],
      timbre:[1, Validators.required],
      achatTTC:['', Validators.required],
      venteTTC:['', Validators.required],
      unite:['0', Validators.required],
      devise:['0', Validators.required],

      ventetHT:['', Validators.required]
    });
  }

  async ngOnInit() {
    await this.getArticles();
    await this.getFournisseurs();
    await this.getFamilles();
    console.log("Articles",this.articles);
    console.log("Familles",this.familles);

    this.articleForm.patchValue({
      refArticle: "ART_" + this.articles.length,
      refFournisseur: "FOUR_" + this.fournisseurs.length,
    });
    
  }
  async getFamilles() {
    this.familles = await this.steService.getFamilles();
  }
  async getFournisseurs() {
    this.fournisseurs = await this.steService.getFournisseurs();
  }
  async getArticles() {
    try {
      this.articles = await this.steService.getArticles(); // Implement getArticles() in SteService
      this.articlesWithChanges = JSON.parse(JSON.stringify(this.articles)); // Deep copy for change tracking
      console.log(this.articles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  }
  calcule() {
    console.log("calcule work");
  
    let achatHT = this.articleForm.value.achatHT;
    let marge = this.articleForm.value.marge;
    let fodec = this.articleForm.value.fodec ? achatHT * 0.01 : 0;
    let timbre = this.articleForm.value.timbre;
    let tva = this.articleForm.value.tva;
  
    // Calculate montantMarge
    let montantMarge = marge * achatHT / 100;
    this.articleForm.patchValue({ montantMarge: montantMarge });
  
    // Calculate venteHT
    let venteHT = Number(achatHT) + montantMarge  + fodec;
    this.articleForm.patchValue({ venteHT: venteHT });
  
    // Calculate achatTTC
    let achatTTC = Number(achatHT) * (1 + tva / 100) + Number(timbre);
    this.articleForm.patchValue({ achatTTC: achatTTC });
  
    // Calculate venteTTC
    let venteTTC = venteHT * (1 + tva / 100);
    this.articleForm.patchValue({ venteTTC: venteTTC });
  
    console.log("articleForm", this.articleForm.value);
  }
  
  
  async onAdd() {
    try {
      //this.articleForm.valid
      if (true) {
        let article: any = this.articleForm.value;
        article.fournisseur=this.fournisseurs[this.articleForm.value.fournisseur];
        article.famille=this.familles[this.articleForm.value.famille];
        article.unite=this.unites[this.articleForm.value.unite];
        article.devise=this.devises[this.articleForm.value.devise];
        article.tva=this.tvaList[this.articleForm.value.tva]
        console.log("articleForm",this.articleForm);
        console.log("newArticle",article);
        //await this.steService.saveArticles(article);
        //await this.ngOnInit(); // Refresh data after saving
        //console.log('Article added successfully.');
      }
    } catch (error) {
      console.error('Error adding article:', error);
    }
  }

  onDelete(id: number) {
    this.steService.deleteDepots(id);
    this.articles = this.articles.filter(d => d.idArticle !== id);
    this.articlesWithChanges = this.articlesWithChanges.filter(d => d.idDepot !== id);
    console.log(this.articles, 'articles');
    console.log(this.articlesWithChanges, 'articlesWithChanges');
    this.updateArticlesUpdated();
  }


  async onSave() {
    try {
      await this.steService.saveAllArticle(this.articlesUpdated);
      alert('Articles updated successfully.');
      await this.getArticles();
      console.log('Articles updated successfully.');
    } catch (error) {
      console.error('Error saving articles:', error);
    }
  }

  check(article: any, event: Event, key: string) {
    if (event) {
      const inputElement = event.target as HTMLInputElement;
      const value = inputElement ? inputElement.value : '';

      // Update articlesWithChanges
      for (let a of this.articlesWithChanges) {
        if (a.idArticle === article.idArticle) {
          if (key === 'depot') {
            // Handle depot change
            // Implement logic based on your application's requirements
            console.log('Depot change logic needs implementation.');
          } else if (a[key] !== value) {
            // Handle other field changes
            a[key] = value;
            console.log(key, value);
          }
          break;
        }
      }

      this.updateArticlesUpdated();
    }
  }

  updateArticlesUpdated() {
    // Update articlesUpdated with changed items
    this.articlesUpdated = this.articlesWithChanges.filter(aw => {
      const found = this.articles.find(a => a.idArticle === aw.idArticle);
      return !this.deepEqual(found, aw);
    });
    console.log('Articles updated:', this.articlesUpdated);
  }

  deepEqual(obj1: any, obj2: any): boolean {
    // Helper function to deep compare objects
    if (obj1 === null || obj1 === undefined || obj2 === null || obj2 === undefined) {
      return obj1 === obj2;
    }
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
      return obj1 === obj2;
    }
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let key of keys1) {
      if (!this.deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }
    return true;
  }

}
