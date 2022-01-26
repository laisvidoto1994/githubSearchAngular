import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GithubService } from './service/github.service';
import { HomeComponent } from './home/home/home.component';
import { HttpClientModule, HttpClient} from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [ GithubService, HttpClient ],
  bootstrap: [AppComponent],
})
export class AppModule { }
