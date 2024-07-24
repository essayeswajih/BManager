import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SteService } from '../../apiServices/ste/ste.service';
import { ToastrService } from 'ngx-toastr';
import { response } from 'express';
import { AuthService } from '../../apiServices/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  form :FormGroup;
  constructor(
    private fb: FormBuilder,
    private ste: SteService,
    private toastr :ToastrService,
    private auth:AuthService
  ){
    this.form = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  async save() {
    if(this.form.valid){
      console.log(this.form.value)
    await this.ste.login(this.form.value).then((data)=>{
      if(data.message=="User login was successful"){
        console.log(data.access_token)
        this.auth.setToken(data.access_token)
        this.toastr.success('Login Successful', 'Success!');
        window.location.href = '/ste';
      }
    });
    }
  }
}
