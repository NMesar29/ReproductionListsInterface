import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lista } from '../models/lista';

@Injectable({
  providedIn: 'root'
})
export class ReproductionListsService {

  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:8081';

  getListas(): Observable<Lista[]>{
    const url: string = `${this.apiUrl}/lists`
    return this.http.get<Lista[]>(url);
  }

  createLista(lista: any): Observable<any>{
    const url: string = `${this.apiUrl}/lists`;
    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.post<any>(url,lista,{headers});
  } 

  findLista(body: any): Observable<any>{
    const slug = this.toSlug(body?.nombre);
    const url = `${this.apiUrl}/lists/${slug}`;
    return this.http.get<any>(url);
  }
  
  deleteLista(body: any): Observable<any> {
    const slug = this.toSlug(body?.nombre);
    const url = `${this.apiUrl}/lists/${slug}`;
    return this.http.delete<any>(url);
  }

  private toSlug(text: string): string{
    return text
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

}
