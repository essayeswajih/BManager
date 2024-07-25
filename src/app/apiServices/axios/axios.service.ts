import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {
  private BASE = "https://bmanagerrestapi.onrender.com";
  private API_URL = 'https://bmanagerrestapi.onrender.com/api/v1';

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

  async get(endPoint: string):Promise<any> {
    const config = this.getConfig();
    try{
      return await axios.get(`${this.API_URL}/${endPoint}`, this.getConfig());
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        console.error('Response data:', error.response?.data);
        console.error('Response status:', error.response?.status);
      } else {
        console.error('Unexpected error:', error);
      }
    }
    
  }
  async getFile(downloadUrl: string) {
    try {
      const response = await axios.get<ArrayBuffer>(this.API_URL + downloadUrl, {
        responseType: 'arraybuffer',
        headers: {
          'Authorization': `Bearer ${this.getToken()}`
        }
      });
      return response;
    } catch (error) {
      console.error('Error downloading the file:', error);
      throw error;
    }
  }

  async post(endPoint: string, data: any):Promise<any>  {
    const config = this.getConfig();
    try{
      return await axios.post(`${this.API_URL}/${endPoint}`, data, this.getConfig());
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        console.error('Response data:', error.response?.data);
        console.error('Response status:', error.response?.status);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }
  async post1(endPoint: string, data: any) :Promise<any> {
    try{
      return await axios.post(`${this.BASE}/${endPoint}`, data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        console.error('Response data:', error.response?.data);
        console.error('Response status:', error.response?.status);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }

  async delete(endPoint: string) :Promise<any> {
    const config = this.getConfig();
    return await axios.delete(`${this.API_URL}/${endPoint}`, this.getConfig());
  }
}
