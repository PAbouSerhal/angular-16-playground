import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from 'src/app/ui/main/main-menu/main-menu.component';
import { ReactiveFormsExampleComponent } from './ui/examples/reactive-forms-example/reactive-forms-example.component';

const routes: Routes = [
  { path: 'MainMenu', component: MainMenuComponent },
  { path: 'reactive-forms-example', component: ReactiveFormsExampleComponent },
  { path: '**', redirectTo: 'reactive-forms-example', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
