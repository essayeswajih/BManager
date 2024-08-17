import { Component, Input } from '@angular/core';
import { SteService } from '../../apiServices/ste/ste.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bon-liv-v-details',
  templateUrl: './bon-liv-v-details.component.html',
  styleUrl: './bon-liv-v-details.component.scss'
})
export class BonLivVDetailsComponent {
  @Input() bonLiv: any = {}; 
  historiqueBonLiv: any = {};

  constructor(private ste: SteService, private toastr: ToastrService) {}

  ngOnChanges() {
    this.fetchArticle(); 
  }

  fetchArticle() {
    if (this.bonLiv && this.bonLiv.id) {
      const idBonLiv = this.bonLiv.id;

      /*this.ste.getHistoriqueBonLivA(idArticle).then(
        (response) => {
          this.historiqueBonLiv = response;
          console.log("Historique article : ", this.historiqueBonLiv);
        }
      ).catch(
        (error) => {
          console.log(error);
          this.toastr.error('Failed to fetch article history');
        }
      );
      */
    } 
  }
}
