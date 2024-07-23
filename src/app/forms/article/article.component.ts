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
      achatHT:['0.000', Validators.required],
      marge:[20,Validators.min(0)],
      montantMarge:[{ value: '0.000', disabled: false }, Validators.required],
      venteHT:[{ value: '0.000', disabled: false }, Validators.required],
      fodec:[false, Validators.required],
      tva:['0', Validators.required],
      venteTTC:[{ value: '0.000', disabled: false }, Validators.required],
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

    let tvaPercentage = this.tvaList [this.articleForm.value.tva] / 100; 
    let montantMarge = marge * achatHT / 100;
    this.articleForm.patchValue({ montantMarge: montantMarge });
    let venteHT = Number(achatHT) + montantMarge + fodec;
    this.articleForm.patchValue({ venteHT: venteHT });
    let tva = venteHT * tvaPercentage;
    let achatTTC = Number(achatHT) + tva;
    this.articleForm.patchValue({ achatTTC: achatTTC });
    let venteTTC = venteHT + tva;
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
        await this.steService.saveArticles(article);
        await this.ngOnInit(); // Refresh data after saving
        console.log('Article added successfully.');
      }
    } catch (error) {
      console.error('Error adding article:', error);
    }
  }

  onDelete(id: number) {
    this.steService.deleteArticle(id);
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
      this.articlesUpdated=[];
      console.log('Articles updated successfully.');
    } catch (error) {
      console.error('Error saving articles:', error);
    }
  }

  check(article: any, event: Event, key: string) {
    
    if (event) {
      const inputElement = event.target as HTMLInputElement;
      const value = inputElement ? inputElement.value : '';
      console.log(article);
      console.log(key);
      console.log(value);
      // Update articlesWithChanges
      for (let a of this.articlesWithChanges) {
        if (a.idArticle === article.idArticle) {
          if(key=== 'achatHT'){
            a[key] = parseFloat(value);
            this.calculateFields(a);

          }
          else if(key=== 'marge'){
            a[key] = parseFloat(value);
            this.calculateFields(a);
          }
          else if(key === 'fodec'){
            a[key] = !a[key];
            this.calculateFields(a);
          }
          else if(key==='tva'){
            a[key] = parseInt(value);
            this.calculateFields(a);
          }
          else if (key === 'idFournisseur') {
             a["fournisseur"][key]=value;
          }
          else if(key === 'idFamille'){
            a["famille"][key]=value;
          
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

  calculateFields(article: any) {
    console.log('dsqqqqqqqqqqqqqqqqqqqqqqqqq')
    console.log(article)
    let achatHT = parseFloat(article.achatHT);
    console.log('achatHT',achatHT)
    let marge = parseFloat(article.marge);
    let fodec = article.fodec ? achatHT * 0.01 : 0;
    let tvaPercentage = article.tva / 100;
    console.log('tvapercentage',tvaPercentage)
    console.log("calcule Fields work");
    let montantMarge = marge * achatHT / 100;

    article.montantMarge= montantMarge ;
    let venteHT = Number(achatHT) + montantMarge + fodec;
    article.venteHT = venteHT ;
    let tva = venteHT * tvaPercentage;
    let achatTTC = Number(achatHT) + tva;
    console.log('achatTTC',achatTTC,'achatHT',achatHT,'tva',tva)
    article.achatTTC = achatTTC ;
    let venteTTC = venteHT + tva;
    article.venteTTC = venteTTC ;
    console.log("articleForm", this.articleForm.value);
    console.log(article)
    this.changeArticle(article);
    console.log('articlesForChange',this.articlesUpdated)
    return article;
  }
  async changeArticle(article :any){
      for(let i =0 ; i < this.articles.length;i++){
        if(this.articles[i].idArticle === article.idArticle){
          this.articles[i] = article;
          this.articlesWithChanges[this.articlesWithChanges.length]=article;
          await this.steService.saveArticles(article)
      }
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
