import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';
import { MaterialModule } from './shared/material/material.module';
import { ComponentsModule } from './components/components.module';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/compat/database';
import { getDatabase } from 'firebase/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MatTableModule } from '@angular/material/table';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/compat/functions';
import { MatSortModule } from '@angular/material/sort';





@NgModule({
  declarations: [
    AppComponent,
    ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    MaterialModule,
    ComponentsModule,
    MatTableModule,
    MatSortModule
  
  ],
  
  providers: [],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
