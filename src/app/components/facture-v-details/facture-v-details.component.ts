import { Component, Input } from '@angular/core';
import { SteService } from '../../apiServices/ste/ste.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-facture-v-details',
  templateUrl: './facture-v-details.component.html',
  styleUrl: './facture-v-details.component.scss'
})
export class FactureVDetailsComponent {
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