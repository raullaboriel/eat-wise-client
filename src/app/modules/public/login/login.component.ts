import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { PublicService } from '../../public.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['raul', Validators.required],
    password: ['contraseña_segura', Validators.required]
  });

  errorMessage = '';
  isLogging = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private publicService: PublicService
  ) { }


  login() {
    this.loginForm.markAllAsTouched();

    if (!this.loginForm.valid) return;

    this.isLogging = true;
    this.errorMessage = '';

    this.publicService.login(this.loginForm.value.username!, this.loginForm.value.password!)
      .subscribe({
        next: (user) => {
          //add user to localstorage
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigateByUrl('/', {
            state: user
          });

          this.isLogging = false;
        },
        error: () => {
          this.isLogging = false
          this.errorMessage = 'Usuario o contraseña incorrectos.';
        },
      })
  }
}