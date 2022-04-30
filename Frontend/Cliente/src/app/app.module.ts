import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { EditorComponent } from './components/editor/editor.component';
import { ConsolaComponent } from './components/consola/consola.component';
import { AceEditorModule } from "ng2-ace-editor";
import { ModalComponent } from './components/modal/modal.component';
import { ASTComponent } from './components/ast/ast.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EditorComponent,
    ConsolaComponent,
    ModalComponent,
    ASTComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CodemirrorModule,
    AceEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
