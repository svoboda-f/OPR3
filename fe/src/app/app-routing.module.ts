import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { DiaryComponent } from './components/diary/diary.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'calculator', component: CalculatorComponent },
  { path: 'diary', component: DiaryComponent, canActivate: [AuthGuardService]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  { path: '**', redirectTo: '/' },
  { path: '', pathMatch: 'full', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
