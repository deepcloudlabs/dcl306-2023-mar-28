import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { TckimliknoDirective } from './tckimlikno.directive';
import { IbanDirective } from './iban.directive';
import { NumberDirective } from './number.directive';

@NgModule({
  declarations: [
    AppComponent,
    TckimliknoDirective,
    IbanDirective,
    NumberDirective

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
