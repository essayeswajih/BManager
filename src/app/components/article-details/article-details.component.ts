import { ToastrService } from 'ngx-toastr';
import { SteService } from './../../apiServices/ste/ste.service';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'] // Fixed 'styleUrl' to 'styleUrls'
})
export class ArticleDetailsComponent implements OnChanges {
  @Input() article: any = {}; 
  historiqueArticle: any = {};

  constructor(private ste: SteService, private toastr: ToastrService) {}

  ngOnChanges() {
    this.fetchArticle(); 
  }

  fetchArticle() {
    if (this.article && this.article.article && this.article.article.idArticle) {
      const idArticle = this.article.article.idArticle;

      this.ste.getHistoriqueArticle(idArticle).then(
        (response) => {
          this.historiqueArticle = response;
          console.log("Historique article : ", this.historiqueArticle);
        }
      ).catch(
        (error) => {
          console.log(error);
          this.toastr.error('Failed to fetch article history');
        }
      );
    } 
  }
}
