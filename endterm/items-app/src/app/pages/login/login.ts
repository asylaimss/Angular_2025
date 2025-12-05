import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [FormsModule, NgIf, RouterLink],
})
export class LoginComponent {

  email = '';
  password = '';
  error: string | null = null;
  loading = false;

  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  async onSubmit() {
    this.error = null;

    if (!this.email || !this.password) {
      this.error = 'Please enter email and password.';
      return;
    }

    try {
      this.loading = true;

      await this.auth.login(this.email, this.password);

      // ⬇️ ПЕРЕХОД НА ПРОФИЛЬ
      this.router.navigate(['/profile']);

    } catch (e: any) {
      this.error = e?.message || 'Login failed';
    } finally {
      this.loading = false;
    }
  }
}