import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private route:Router) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  isUserLoggedIn() {
    return this.getToken()!==null;
  }
  isUserAdmin() {}
  isUserManager() {}
  isUserEmployee() {}

  getToken(): string | null {
    if (this.isBrowser && localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      if(token !=null && this.checkExpiredTime(token)){
        return token;
      }
    }
    return null;
  }
  
  checkExpiredTime(token: string): boolean {
    const tokenData = this.decodeToken(token);
    if (tokenData && tokenData.exp) {
      const expirationDate = new Date(tokenData.exp * 1000); // Convert seconds to milliseconds
      const currentDate = new Date();
      console.log(expirationDate)
      return currentDate > expirationDate; // Return true if the token is expired
    }
      return true;
  }
  
  decodeToken(token: string): any {
    const parts = token.split('.');
    if (parts.length !== 3) {
      this.route.navigateByUrl("/Login")
    }
    const decoded = atob(parts[1]);
    return JSON.parse(decoded);
  }
  

  setToken(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem('token', token);
    }
  }
  removeToken(){
    if(this.isBrowser){
      localStorage.removeItem('token');
    }
  }
  logout(){
    this.removeToken();
    this.route.navigateByUrl("/Login");
  }
  getSte(){}
}
