import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
  imports: [FormsModule]
})
export class SignupComponent {

  email = '';
  password = '';
  error = '';
  success = '';  // ← ДОБАВЛЕНО

  constructor(private auth: AuthService, private router: Router) {}

  onSignup() {
    console.log("signup clicked —", this.email);
    this.auth.signup(this.email, this.password)
      .then(() => {
        this.success = "Account created!";
        this.router.navigate(['/profile']);
      })
      .catch(err => this.error = err.message);
  }
}
