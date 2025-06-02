import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ROUTES } from '../../routes.constans';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage implements OnInit {

 
  loginForm!: FormGroup;
  errorMessage: string = '';
  ROUTES = ROUTES;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.loginForm.invalid) return;

    const { login, password } = this.loginForm.value;

    this.authService.login(login, password).subscribe({
      next: (res) => {
        //this.authService.saveToken(res.jwtToken);
        this.router.navigate([ROUTES.HOME]);
      },
      error: (err) => {
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    });
  }
}
