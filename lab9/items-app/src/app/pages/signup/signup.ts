import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
  imports: [FormsModule, RouterLink, NgIf]
})
export class SignupComponent {
  email = '';
  password = '';
  error = '';
  success = '';

  constructor(private auth: AuthService, private router: Router) {}

  async onSignup() {
    try {
      // 1. Создаем аккаунт
      await this.auth.signup(this.email, this.password);

      // 2. Автологин сразу после регистрации
      await this.auth.login(this.email, this.password);

      // 3. Переход в профиль
      this.router.navigate(['/profile']);

    } catch (err: any) {
      this.error = err.message || 'Signup failed';
      console.error(err);
    }
  }
}