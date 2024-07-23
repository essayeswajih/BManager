import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {
  private BASE = "http://localhost:9090";
  private API_URL = 'http://localhost:9090/api/v1';

  constructor(private authService:AuthService) { }

  private getConfig(): AxiosRequestConfig {
    const token = this.getToken();
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };
  }

  getToken(): string | null{
    let token = this.authService.getToken();
    return this.authService.getToken();
  }

  async get(endPoint: string) {
    const config = this.getConfig();
    return await axios.get(`${this.API_URL}/${endPoint}`, this.getConfig());
  }

  async post(endPoint: string, data: any) {
    const config = this.getConfig();
    return await axios.post(`${this.API_URL}/${endPoint}`, data, this.getConfig());
  }
  async post1(endPoint: string, data: any) {
    return await axios.post(`${this.BASE}/${endPoint}`, data);
  }

  async delete(endPoint: string) {
    const config = this.getConfig();
    return await axios.delete(`${this.API_URL}/${endPoint}`, this.getConfig());
  }
}
