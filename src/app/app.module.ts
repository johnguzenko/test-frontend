import {Num2StrPipe} from './pipes/num2str-pipe';
import {MockBackendServiceService} from './services/mock-backend-service/mock-backend-service.service';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SpecialistsToShopsComponent} from './containers/specialists-to-shops/specialists-to-shops.component';
import {SpecialistsComponent} from './components/specialists/specialists.component';
import {ShopsComponent} from './components/shops/shops.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SpecialistShelfComponent} from './components/specialist-shelf/specialist-shelf.component';
import {SpecialistInfoComponent} from './components/specialist-info/specialist-info.component';
import {SpecialistNotFoundComponent} from './components/specialist-not-found/specialist-not-found.component';
import { ShopItemComponent } from './components/shop-item/shop-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SpecialistsToShopsComponent,
    SpecialistsComponent,
    ShopsComponent,
    SpecialistShelfComponent,
    SpecialistInfoComponent,
    SpecialistNotFoundComponent,
    Num2StrPipe,
    ShopItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockBackendServiceService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
