import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Profile } from "../model/Profile";
import { Observable } from "rxjs/internal/Observable";


@Injectable({
  providedIn: 'root',
})

export class ProfileService {
  private apiUrl = "http://localhost:8084/profile-service/v1" 

  constructor(private http: HttpClient) {}

  getData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAPIProfileDetails`);
  }

  updateUser(profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${this.apiUrl}/getAPIProfileDetailsById/${profile.id}`, profile);
  }

  getUser(id: number): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/getAPIProfileDetailsById/${id}`);
  }

 addUser(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(`${this.apiUrl}/addAPIProfileDetails`, profile);
  }

  deleteUser(id: number) : Observable<Profile>{
      return this.http.delete<Profile>(`${this.apiUrl}/deleteAPIProfileDetailsById/${id}`);
  }
  
}