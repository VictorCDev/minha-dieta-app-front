import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = '	https://putrefiable-beachy-birgit.ngrok-free.dev';

  private apiUrl = `${this.baseUrl}/api/auth`;
  private usersApiUrl = `${this.baseUrl}/api/users`;

  // private apiUrl = 'http://localhost:8080/api/auth';
  // private usersApiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  /**
   * Envia as credenciais para a API e armazena o token em caso de sucesso.
   * @param credentials - Objeto com email e password.
   * @returns Um Observable com a resposta da API (que deve conter o token).
   */
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response && response.jwtToken) {
          localStorage.setItem('authToken', response.jwtToken);
        }
      })
    );
  }

  /**
   * Remove o token de autenticação, efetivamente fazendo logout.
   */
  logout(): void {
    localStorage.removeItem('authToken');
  }

  /**
   * Recupera o token de autenticação do localStorage.
   * @returns O token JWT ou null se não existir.
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Verifica se o usuário está logado (se existe um token).
   * @returns true se houver um token, false caso contrário.
   */
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  /**
   * Envia os dados de um novo usuário para a API de registro.
   * @param user - Objeto com username, email e password.
   * @returns Um Observable com a resposta da API.
   */
  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.usersApiUrl}/register`, user);
  }
}