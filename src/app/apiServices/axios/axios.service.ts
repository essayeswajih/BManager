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
    return 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJXYWppaCBFc3NheWVzIiwiaWF0IjoxNzIxNjYyODI0LCJleHAiOjE3MjE3NDkyMjR9.3-vBY6M3-PQ3QvOQonc1Y8RbQ4wJnJBsOVYa0n5CxX0vt9qhbQW5zhqpQoipRXm4';
  }

  async get(endPoint: string) {
    const config = this.getConfig();
    return await axios.get(`${this.API_URL}/${endPoint}`, this.getConfig());
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
