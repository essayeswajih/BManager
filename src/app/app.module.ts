import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SteComponent } from './pages/ste/ste.component';
import { MesDoneeComponent } from './pages/mes-donee/mes-donee.component';
import { ClientComponent } from './forms/client/client.component';
import { ArticleComponent } from './forms/article/article.component';
import { FamilleComponent } from './forms/famille/famille.component';
import { DepotComponent } from './forms/depot/depot.component';
import { FournisseurComponent } from './forms/fournisseur/fournisseur.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BonCmdComponent } from './forms/achat/bon-cmd/bon-cmd.component';
import { BonLivComponent } from './forms/achat/bon-liv/bon-liv.component';
import { ToastrModule } from 'ngx-toastr';
import { FactureComponent } from './forms/achat/facture/facture.component';
import { DevisComponent } from './forms/vente/devis/devis.component';
import { BonLivVComponent } from './forms/vente/bon-liv-v/bon-liv-v.component';
import { FactureVComponent } from './forms/vente/facture-v/facture-v.component';
import { HestoriqueArticleComponent } from './forms/hestorique-article/hestorique-article.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NewBonLivComponent } from './components/new-bon-liv/new-bon-liv.component';
import { NewFactureAComponent } from './components/new-facture-a/new-facture-a.component';
import { NewFactureVComponent } from './components/new-facture-v/new-facture-v.component';
import { NewBonLivVComponent } from './components/new-bon-liv-v/new-bon-liv-v.component';
import { StockComponent } from './pages/stock/stock.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { ClientsComponent } from './pages/stocks/clients/clients.component';
import { FournisseursComponent } from './pages/stocks/fournisseurs/fournisseurs.component';
import { BlvComponent } from './pages/stocks/blv/blv.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ArticleComponent,
    FournisseurComponent,
    DepotComponent,
    FamilleComponent,
    ClientComponent,
    BonCmdComponent,
    BonLivComponent,
    FactureComponent,
    DevisComponent,
    BonLivVComponent,
    FactureVComponent,
    HestoriqueArticleComponent,
    LoginComponent,
    RegisterComponent,
    TopBarComponent,
    AppComponent,
    HomeComponent,
    SteComponent,
    MesDoneeComponent,
    NavBarComponent,
    FooterComponent,
    CarouselComponent,
    NewBonLivComponent,
    NewFactureAComponent,
    NewFactureVComponent,
    NewBonLivVComponent,
    StockComponent,
    ArticleDetailsComponent,
    ClientsComponent,
    FournisseursComponent,
    BlvComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    NgbModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
