import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { CourseComponent } from './courses/course/course.component';
import { CourseDialogComponent } from './courses/course-dialog/course-dialog.component';
import { CourseCardListComponent } from './courses/course-card-list/course-card-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CourseComponent,
    CourseDialogComponent,
    CourseCardListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
