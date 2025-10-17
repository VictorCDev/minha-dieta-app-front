import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    // Rota padrão: redireciona para /login se o caminho for vazio
    { path: '', redirectTo: '/login', pathMatch: 'full' },

    // Rota de login: quando a URL for /login, carrega o LoginComponent
    { path: 'login', component: LoginComponent }
];