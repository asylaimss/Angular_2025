import { Component } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { RouterLink } from '@angular/router';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  imports: [RouterLink, NgIf, AsyncPipe]   // ← ВАЖНО
})
export class NavbarComponent {
  user$ = this.auth.currentUser$;

  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
