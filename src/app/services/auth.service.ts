import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse, RegisterResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  //La URL del backend
  private apiUrl = 'http://localhost:5289/api/Auth';

  constructor(private http: HttpClient) { }

  register(fullName: string, email: string, password: string): Observable<RegisterResponse>{
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`,{
      fullName,
      email,
      password
    });
  }

  login(email: string, password: string): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`,{
      email,
      password
    })
  }

  saveToken(token: string): void{
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}

