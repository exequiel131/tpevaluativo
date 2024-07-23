import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { SharedModule } from './modules/shared/shared.module';



//firebase
//firebase -importamos herramientas de la base de datoas
import { environment } from 'src/environments/enviroment';
import {AngularFireModule}  from '@angular/fire/compat';
import {AngularFireAuthModule}  from '@angular/fire/compat/auth';
import {AngularFireStorageModule}  from '@angular/fire/compat/storage';




@NgModule({
  declarations: [
    AppComponent,
  
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    //importamos 
    AngularFireModule.initializeApp(environment.firebaseConfig), //inicializar firebase dentro del proyecto
    AngularFireAuthModule,
    AngularFireStorageModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
