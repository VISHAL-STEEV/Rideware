import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from 'app/app.component';
import { appConfig } from 'app/app.config';
import { environment } from 'environments/environments/environment.prod';

if(environment.production){
  enableProdMode();
}



bootstrapApplication(AppComponent, appConfig)
    .catch(err => console.error(err));
