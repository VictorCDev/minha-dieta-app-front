// src/app/pages/register/register.component.ts
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: ''
  };
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;

    this.authService.register(this.user).subscribe({
      next: (response) => {
        console.log('Usuário registrado com sucesso!', response);
        this.successMessage = 'Cadastro realizado com sucesso! Redirecionando para o login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        console.error('Falha no registro', err);
        this.errorMessage = err.error?.message || 'Não foi possível realizar o cadastro. Verifique os dados e tente novamente.';
      }
    });
  }
}