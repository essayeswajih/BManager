import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  isUserLoggedIn() {
    return this.getToken()!=null
  }
  isUserAdmin() {}
  isUserManager() {}
  isUserEmployee() {}
  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('token');
    }
    return null;
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
  getSte(){}
}
