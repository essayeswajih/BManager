import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SteComponent,
    MesDoneeComponent,
    ClientComponent,
    ArticleComponent,
    FamilleComponent,
    DepotComponent,
    FournisseurComponent,
    NavBarComponent,
    TopBarComponent,
    FooterComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    NgbModule,
    FontAwesomeModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
