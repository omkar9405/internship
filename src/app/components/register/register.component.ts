import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;
  success='';
  userDto = {
   "firstName":"",
   "lastName": "",
   "email":"",
   "phone": "",
   "password":"",
   "confirmPassword": "",
   "type":""
  }
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  constructor(
    private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService:AuthenticationService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword:['',Validators.required]
      
  });
  }
  register() {
    this.submitted = true;


        this.loading = true;
    this.authenticationService.signup(this.userDto).subscribe(
      (data:any) => {
        console.log(data);
        this.success='success';
        alert("Registered Successfully");
      
       
    },(err) => {
        alert(err);
        this.error=err;
        this.loading =false;
    
    });
  }


}
