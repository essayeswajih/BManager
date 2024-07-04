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
    19,17,13,7
  ];
  unites = [
    'pièce','kg','litre','ml','m','m²','m³','cm','cm²','cm³',
  ];
  devises = [
    'EUR','USD','DNT'
  ];
  familles = [];

  constructor(private fb: FormBuilder, private steService: SteService) {
    this.articleForm = this.fb.group({
      refArticle: ['', Validators.required], // Assuming idDepot is required for an article
      refFournisseur: ['', Validators.required],
      designation: ['', Validators.required],
      famille:[],
      model:[],
      achatHT:[],
      montantMarge:[],
      venteHT:[],
      fodec:[],
      tva:[],
      timbre:[],
      achatTTC:[],
      venteTTC:[],
      unite:[],
      devise:[],
    });
  }

  async ngOnInit() {
    await this.getArticles();
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

  async onAdd() {
    try {
      if (this.articleForm.valid) {
        let article: any = {
          designation: this.articleForm.value.designation,
          famille: this.articleForm.value.famille,
          depot: { idDepot: Number(this.articleForm.value.idDepot) } // Assuming idDepot is a number
        };
        await this.steService.saveArticles(article);
        await this.ngOnInit(); // Refresh data after saving
        console.log('Article added successfully.');
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
