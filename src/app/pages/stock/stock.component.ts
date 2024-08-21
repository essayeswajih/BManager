import { ToastrService } from 'ngx-toastr';
import { SteService } from './../../apiServices/ste/ste.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  ArticlesList: any[] = [];
  filteredArticles: any[] = [];
  searchQuery: string = '';
  sortBy: string = '0';
  isActive: boolean = false;
  selectedArticle:any={};
  checkedArticles:any[] = [];
  checkAll = false;
  constructor(private ste: SteService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.ste.getStock().then(
      (data: any) => {
        this.ArticlesList = data;
        this.filteredArticles = this.ArticlesList;
        for(let x of this.filteredArticles){
          x.checked=false;
        }
        console.log(this.ArticlesList);
      }
    ).catch((error) => {
      console.error('Error fetching stock:', error);
      this.toastr.error('Failed to load stock data.');
    });
  }

  onSearchChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchValue = inputElement.value;
    this.searchQuery = searchValue;
    this.applyFilters();
  }

  onSortChange(event:Event): void {
    const inputElement = event.target as HTMLInputElement;
    const sortValue = inputElement.value;
    this.sortBy = sortValue;
    console.log(this.sortBy)
    this.applyFilters();
  }

  private applyFilters(): void {
    console.log('Search Query:', this.searchQuery);
    let filtered = this.ArticlesList.filter(article => 
      (article.article.designation || '').toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    console.log('Filtered Articles:', filtered);
    switch (this.sortBy) {
      case '1': 
        filtered.sort((a, b) => (a.article.achatHT ?? 0) - (b.article.achatHT ?? 0));
        break;
      case '2':
        filtered.sort((a, b) => (a.qte ?? 0) - (b.qte ?? 0));
        break;
      default:
        filtered.sort((a, b) => (a.article.designation || '').localeCompare(b.article.designation || ''));
        break;
    }
  
    this.filteredArticles = filtered;
    console.log('Sorted Articles:', this.filteredArticles);
  }
  Active(){
    this.isActive = ! this.isActive;
  }
  
  select(article:any) {
    this.selectedArticle=article;
    this.Active();
  }
  check(article:any){
    for(let x of this.filteredArticles){
      if(x.article.idArticle === article.idArticle){
      x.checked == false ? x.checked=true : x.checked=false;
      }
    }
    console.log(this.filteredArticles)
  }
  checkedAll() {
    if(!this.checkAll){
      for(let x of this.filteredArticles){
        x.checked=true;
      }
      this.checkAll=true;
    }else{
      for(let x of this.filteredArticles){
        x.checked=false;
      }
      this.checkAll=false;
    }
  }
  toInventaire() {
    let articleList :any[] = [];
    for(let x of this.filteredArticles){
      if(x.checked){
        articleList.push(x.article);
      }
    }
    this.ste.toInventaire(articleList).then(
      (response) => {
        this.toastr.success("ssss","sss");
        console.log("response:",response)
      }
    );
  }
}
