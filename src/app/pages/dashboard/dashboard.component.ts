import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule} from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MenuModule, ButtonModule, AvatarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  items: MenuItem[] | undefined;
  username: string = 'Usuário';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Tenta pegar o nome salvo. 
    // Como ainda não implementamos a decodificação do Token para pegar o nome real,
    // vamos deixar um valor estático ou pegar do localStorage se tivermos salvo lá.
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      this.username = userObj.username || 'Visitante';
    }  

    this.items = [
      {
          label: 'Navegação',
          items: [
              {
                  label: 'Dashboard',
                  icon: 'pi pi-home', // Ícone do PrimeIcons
                  routerLink: '/dashboard'
              },
              {
                  label: 'Minhas Refeições',
                  icon: 'pi pi-apple',
                  routerLink: '/minhas-refeicoes'
              },
              {
                  label: 'Perfil',
                  icon: 'pi pi-user',
                  routerLink: '/perfil'
              }
          ]
      },
      {
          label: 'Conta',
          items: [
              {
                  label: 'Sair',
                  icon: 'pi pi-sign-out',
                  command: () => {
                      this.logout();
                  }
              }
          ]
      }
    ];
  }

  logout():void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
