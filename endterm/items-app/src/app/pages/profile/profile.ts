import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  imports: [AsyncPipe, NgIf]   // ← ДОБАВИЛИ!
})
export class ProfileComponent {

  user$ = this.auth.currentUser$;

  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout().then(() => this.router.navigate(['/']));
  }
}
