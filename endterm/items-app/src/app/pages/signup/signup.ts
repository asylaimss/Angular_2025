import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
  imports: [FormsModule, NgIf, RouterLink],
})
export class SignupComponent {
  email = '';
  password = '';
  repeatPassword = '';
  error: string | null = null;
  loading = false;

  constructor(public auth: AuthService, private router: Router) {}

  async signup() {
    this.error = null;

    if (!this.email || !this.password || !this.repeatPassword) {
      this.error = 'Please fill all fields.';
      return;
    }
    if (this.password !== this.repeatPassword) {
      this.error = 'Passwords do not match.';
      return;
    }
    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters.';
      return;
    }

    try {
      this.loading = true;
      await this.auth.signup(this.email, this.password);
      await this.router.navigate(['/profile']);
    } catch (e: any) {
      this.error = e?.message || 'Signup failed';
    } finally {
      this.loading = false;
    }
  }
}