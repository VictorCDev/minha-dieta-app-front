import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RegisterFoodComponent } from '../register-food/register-food.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MenuModule, ButtonModule, AvatarModule, CardModule, ProgressBarModule, RegisterFoodComponent],
  providers: [DialogService, DynamicDialogRef],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  ref: DynamicDialogRef | undefined;
  items: MenuItem[] | undefined;
  username: string = 'Usuário';

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialogService: DialogService
  ) { }

  dailySummary = {
    calories: { current: 1250, target: 2000, percentage: 62 },
    protein: { current: 90, target: 150, percentage: 60 },
    carbs: { current: 150, target: 250, percentage: 60 },
    fat: { current: 40, target: 70, percentage: 57 }
  };

  meals = [
    { name: 'Café da Manhã', time: '08:00', calories: 450, items: ['2 Ovos', '1 Pão Integral', 'Café Preto'] },
    { name: 'Almoço', time: '12:30', calories: 680, items: ['Arroz Branco', 'Feijão', 'Peito de Frango', 'Salada'] },
    { name: 'Lanche da Tarde', time: '16:00', calories: 0, items: [] }, // Exemplo de refeição vazia
    { name: 'Jantar', time: '20:00', calories: 0, items: [] }
  ];

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
            routerLink: '/my-meals'
          },
          {
            label: 'Perfil',
            icon: 'pi pi-user',
            routerLink: '/profile'
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

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  registerFood() {
    // Abre o componente RegisterFood dentro de uma janela modal
    this.ref = this.dialogService.open(RegisterFoodComponent, {
      header: 'Registrar Alimento',
      width: '90%',        // Responsivo: 90% em telas pequenas
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      breakpoints: {
        '960px': '75vw', // Em tablets usa 75%
        '640px': '90vw'  // Em celulares usa 90%
      }
    });

    // O que acontece quando a janela fecha?
    this.ref.onClose.subscribe((data: any) => {
      if (data) {
        console.log('Dados recebidos do modal:', data);
        // AQUI VAMOS CHAMAR O BACKEND DEPOIS
        // Por enquanto, apenas para ver funcionar, vamos adicionar na lista visualmente:
        this.meals[0].items.push(data.foodName + ' (' + data.calories + ' kcal)');
      }
    });
  }

  // Boa prática: Destruir a referência ao sair
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}