
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_ADRESS, API_POSITION, API_PROFILE } from '../constants/api';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<any>{
    return this.http.get<any>(API_PROFILE +'/');
  }

  getByUsername(userName: string): Observable<any> {
    return this.http.get<any>(API_PROFILE +'/user/'+userName);
  }
  getPosition(): Observable<any> {
    return this.http.get<any>(API_POSITION);
  }
  getSubDistricts(): Observable<any> {
    return this.http.get<any>(API_ADRESS +'/subdistricts');
  }
  getDistricts(): Observable<any> {
    return this.http.get<any>(API_ADRESS +'/districts');
  }
  getProvinces(): Observable<any> {
    return this.http.get<any>(API_ADRESS +'/provinces');
  }
  getPostalCode(): Observable<any> {
    return this.http.get<any>(API_ADRESS +'/postalCode');
  }

  createProfile(body:any): Observable<any> {
    return this.http.post<any>(API_PROFILE + '/',body);
  }

  updataProfile(id: string,body:any): Observable<any> {
    return this.http.put<any>(API_PROFILE + '/update/'+id, body);
  }
}
