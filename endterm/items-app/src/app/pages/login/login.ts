import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';       // ⬅️ добавили

import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink,                                    // ⬅️ добавили сюда
  ],
})
export class LoginComponent {
  submitted = false;
  firebaseError: string | null = null;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  get email() {
    return this.loginForm.get('email')!;
  }
  get password() {
    return this.loginForm.get('password')!;
  }

  onSubmit() {
    this.submitted = true;
    this.firebaseError = null;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    this.auth.login(email!, password!).catch(() => {
      this.firebaseError = 'Неверный email или пароль';
    });
  }
}