// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Adicione esta importação para standalone components

@Component({
  selector: 'app-login',
  // Se estiver usando standalone components, adicione imports aqui:
  standalone: true,
  imports: [FormsModule], // Adicione FormsModule para usar [(ngModel)]
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Use styleUrls para a versão moderna
})
export class LoginComponent {
  email!: string; // Usamos '!' para dizer ao TypeScript que esta variável será inicializada
  password!: string;

  constructor() { }

  onSubmit(): void {
    console.log('Formulário de Login Enviado!', this.email, this.password);
    // Aqui no futuro faremos a chamada para o nosso serviço de autenticação
    // Por enquanto, apenas exibimos no console.
  }
}