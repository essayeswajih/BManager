import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {
  private API_URL = 'http://localhost:9090/api/v1';

  constructor() { }

  private getConfig(): AxiosRequestConfig {
    const token = this.getToken();
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };
  }

  getToken(): string {
    return 'your-token-here';
  }

  async get(endPoint: string) {
    const config = this.getConfig();
    return await axios.get(`${this.API_URL}/${endPoint}`);
  }

  async post(endPoint: string, data: any) {
    const config = this.getConfig();
    return await axios.post(`${this.API_URL}/${endPoint}`, data, this.getConfig());
  }

  async delete(endPoint: string) {
    const config = this.getConfig();
    return await axios.delete(`${this.API_URL}/${endPoint}`, this.getConfig());
  }
}
