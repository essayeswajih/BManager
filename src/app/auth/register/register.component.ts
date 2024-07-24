import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../apiServices/auth/auth.service';
import { SteService } from '../../apiServices/ste/ste.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form :FormGroup;
  constructor(
    private fb: FormBuilder,
    private ste: SteService,
    private toastr :ToastrService,
    private auth:AuthService
  ){
    this.form = this.fb.group({
      username: ["", Validators.required],
      businessCode: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required]
    });
  }
  async save() {
    if(this.form.valid ){
      if(this.form.value.password==this.form.value.confirmPassword){
              console.log(this.form.value)
    await this.ste.register(this.form.value).then((data)=>{
      if(data.message=="User register was successful"){
        console.log(data.access_token)
        this.auth.setToken(data.access_token)
        this.toastr.success('Register Successful', 'Success!');
        window.location.href = '/Login';
      }
    });
      }
    }
  }
}
