import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private i18n: TranslationService
  ) {}

  private offlineHandler = () => this.router.navigate(['/offline']);

  ngOnInit() {
    this.i18n.initLang(); // ✅ ВОТ ЭТО НУЖНО
    window.addEventListener('offline', this.offlineHandler);
  }

  ngOnDestroy() {
    window.removeEventListener('offline', this.offlineHandler);
  }
}