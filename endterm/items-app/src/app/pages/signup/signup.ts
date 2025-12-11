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

  // password must have: 8+ chars, 1 digit, 1 special char
  isStrongPassword(pwd: string): boolean {
    const pattern = /^(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    return pattern.test(pwd);
  }

  async signup() {
    this.error = null;

    // --- VALIDATION ---

    if (!this.email || !this.password || !this.repeatPassword) {
      this.error = 'Please fill all fields.';
      return;
    }

    // email format validation
    if (!/^\S+@\S+\.\S+$/.test(this.email)) {
      this.error = 'Please enter a valid email.';
      return;
    }

    if (this.password !== this.repeatPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    if (!this.isStrongPassword(this.password)) {
      this.error =
        'Password must be at least 8 characters and include 1 digit and 1 special character.';
      return;
    }

    // --- SEND REQUEST ---
    try {
      this.loading = true;
      await this.auth.signup(this.email, this.password);
      this.router.navigate(['/profile']);
    } catch (e: any) {
      if (e?.code === 'auth/email-already-in-use') {
        this.error = 'This email is already registered.';
      } else {
        this.error = e?.message || 'Signup failed';
      }
    } finally {
      this.loading = false;
    }
  }
}