import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lista } from '../models/lista';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class ReproductionListsService {

  constructor(private http: HttpClient, private authService: AuthService) {}
  private apiUrl = 'http://localhost:8081';

  private getAuthHeaders(): HttpHeaders{
    const token = this.authService.getToken();
    console.log('Token almacenado:', localStorage.getItem('auth_token'));
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getListas(): Observable<Lista[]>{
    const url: string = `${this.apiUrl}/lists`
    return this.http.get<Lista[]>(url,{headers: this.getAuthHeaders()});
  }

  createLista(lista: any): Observable<any>{
    const url: string = `${this.apiUrl}/lists`;
    return this.http.post<any>(url,lista,{headers: this.getAuthHeaders()});
  } 

  findLista(body: any): Observable<any>{
    const slug = this.toSlug(body?.nombre);
    const url = `${this.apiUrl}/lists/${slug}`;
    return this.http.get<any>(url, {headers: this.getAuthHeaders()});
  }
  
  deleteLista(body: any): Observable<any> {
    const slug = this.toSlug(body?.nombre);
    const url = `${this.apiUrl}/lists/${slug}`;
    return this.http.delete<any>(url, {headers: this.getAuthHeaders()});
  }

  private toSlug(text: string): string{
    return text
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

}
