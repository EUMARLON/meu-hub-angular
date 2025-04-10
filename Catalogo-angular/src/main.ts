import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './app/login/login.component';
import { HubComponent } from './app/hub/hub.component';
import { ReportsComponent } from './app/reports/reports.component';
import { SettingsComponent } from './app/settings/settings.component';
import { UserPanelComponent } from './app/user-panel/user-panel.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'hub',
    component: HubComponent,
    children: [
      { path: 'user-panel', component: UserPanelComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'reports', component: ReportsComponent }
      
    ]
  }
];



@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet> <!-- Espaço para renderizar componentes das rotas -->
  `,
  standalone: true,
  imports: [FormsModule, RouterModule] // Incluindo RouterModule
})
export class App {}

bootstrapApplication(App, {
  providers: [provideRouter(routes)] // Registrando as rotas
});