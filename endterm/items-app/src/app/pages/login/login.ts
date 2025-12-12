import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink,
  ],
})
export class LoginComponent {

  submitted = false;
  firebaseError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router              // ⬅️ добавили для redirect
  ) {}

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

  async onSubmit() {
    this.submitted = true;
    this.firebaseError = null;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    try {
      await this.auth.login(email!, password!);

      // ⬅️ сразу переводим на профиль
      this.router.navigate(['/profile']);

    } catch (err: any) {
      this.firebaseError = 'Wrong email or password';
    }
  }
}