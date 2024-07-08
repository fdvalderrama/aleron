import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { IAuto } from '../interfaces/auto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoService {
  private _endpoint: string = environment.endPoint;
  private apiUrl: string = this._endpoint + "Autos/";

  constructor(private _http: HttpClient) {}

  getList(): Observable<IAuto[]> {
    return this._http.get<IAuto[]>(`${this.apiUrl}`);
  }

  add(request: IAuto): Observable<IAuto[]> {
    return this._http.post<IAuto[]>(`${this.apiUrl}`, request);
  }

  update(request: IAuto): Observable<void> {
    return this._http.put<void>(`${this.apiUrl}${request.id}`, request);
  }

  delete(id: number): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}${id}`);
  }
}
