import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {
  public loginForm: FormGroup
  constructor(public fb: FormBuilder, public router: Router) { }

  ngOnInit(): void {
    this.InitializeForm()
  }
  InitializeForm() {
    this.loginForm = this.fb.group({
      username: [null,[Validators.required,Validators.email]],
      password: [null,[Validators.required,Validators.minLength(1),Validators.maxLength(30)]]
    })
  }
  NavigateToDashBoard(userData) {
    if (userData.username && userData.password && userData.username == 'user@gmail.com' && userData.password == '123') {
      localStorage.setItem('username',userData.username)
      localStorage.setItem('password',userData.password)
      this.router.navigate(['/dashboard']);
      console.log(userData.username)
      console.log(userData.password)
    }
    else
    {
      alert('Invalid User Name or Password')
    }
  }
}
