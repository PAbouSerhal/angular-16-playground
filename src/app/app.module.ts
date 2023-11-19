//#region Modules 0> imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
//#endregion

//#region Providers
import { CommonService } from './service/common.service';
//#endregion

//#region components -> declarations
import { AppComponent } from './app.component';
import { HeaderComponent } from './ui/base/header/header.component';
import { FooterComponent } from './ui/base/footer/footer.component';
import { MainMenuComponent } from './ui/main/main-menu/main-menu.component';
import { ReactiveFormsExampleComponent } from './ui/examples/reactive-forms-example/reactive-forms-example.component';
//#endregion

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainMenuComponent,
    ReactiveFormsExampleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [CommonService],
  bootstrap: [AppComponent],
})
export class AppModule {}
