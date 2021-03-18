import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './components/container/container.component';
import { CallbackComponent } from './components/calllback/callback.component';
const routes: Routes = [
  { path: 'bill', component: ContainerComponent },
  { path: 'callback', component: CallbackComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
