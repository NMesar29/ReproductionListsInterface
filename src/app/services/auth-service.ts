import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  login(login: string, password: string): Observable<any> {
    return this.http.post<{jwtToken:string}>(`${this.apiUrl}/login`, { login, password })
      .pipe(
        tap(response => {
          if(response && response.jwtToken){
            this.saveToken(response.jwtToken);
          }
        })
      );
  }

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }
}
