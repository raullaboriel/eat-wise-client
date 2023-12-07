import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from './public/interfaces/public.interfaces';
import { BASE_URL } from '../config/constants/config.constants';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<User> {
    return this.http.post(`${BASE_URL}/auth/login`, {
      username,
      password
    }, { withCredentials: true }).pipe(
      map((response: any): User => {

        const user = response.user;
        return {
          id: user._id,
          ...user
        }
      })
    )
  }

  logout(): Observable<any> {
    return this.http.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
  }
}
