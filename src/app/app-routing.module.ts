import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserFormComponent} from "./user-form/user-form.component";
import {InfoUserComponent} from "./info-user/info-user.component";

const routes: Routes = [
  {path : '', component: UserFormComponent},
  {path: 'informationsUser', component: InfoUserComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
