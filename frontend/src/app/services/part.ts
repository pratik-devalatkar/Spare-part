import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PartService {

  private apiUrl = 'http://localhost:5000/api/parts';

  constructor(private http: HttpClient) {}

  addPart(data: any) {
    return this.http.post(`${this.apiUrl}/add`, data);
  }

  getAllParts() {
    return this.http.get<any[]>(this.apiUrl);
  }

  addStock(id: string, quantity: number) {
    return this.http.put(`${this.apiUrl}/add-stock/${id}`, { quantity });
  }

  removeStock(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/remove-stock/${id}`, data);
  }

  getDashboard() {
    return this.http.get(`${this.apiUrl}/dashboard`);
  }

  getHistory() {
    return this.http.get<any[]>(`${this.apiUrl}/history`);
  }
}

