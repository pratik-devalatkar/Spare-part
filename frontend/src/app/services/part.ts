import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PartService {

  private backendUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  connectBackend() {
    return this.http.get(this.backendUrl, { responseType: 'text' });
  }
}
