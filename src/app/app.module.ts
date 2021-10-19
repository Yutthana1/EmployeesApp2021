import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import {RouterModule} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {ToolbarModule} from "primeng/toolbar";
import {DialogModule} from "primeng/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EmployeesCreateComponent } from './employees-create/employees-create.component';
import {InputTextModule} from "primeng/inputtext";
import {MessagesModule} from "primeng/messages";
import {MessageModule} from "primeng/message";
import {CalendarModule} from "primeng/calendar";



@NgModule({
  declarations: [
    AppComponent,
    EmployeesListComponent,
    EmployeesCreateComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ButtonModule,
    TableModule,
    ToolbarModule,
    DialogModule,
    BrowserAnimationsModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    CalendarModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
