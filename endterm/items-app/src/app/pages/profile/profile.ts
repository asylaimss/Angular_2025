import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserProfileService, UserProfile } from '@services/user-profile.service';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],

  // 🔥 ОБЯЗАТЕЛЬНО Добавляем эти импорты!
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    NgIf,
    NgFor,
  ]
})
export class ProfileComponent implements OnInit {

  profile: UserProfile | null = null;
  editableName = '';
  selectedAvatar = '';
  loading = true;
  saving = false;
  error = '';
  success = '';

  avatars = [
    "https://i.pravatar.cc/150?img=1",
    "https://i.pravatar.cc/150?img=2",
    "https://i.pravatar.cc/150?img=3",
    "https://i.pravatar.cc/150?img=4",
    "https://i.pravatar.cc/150?img=5"
  ];

  constructor(
    private profileService: UserProfileService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const uid = this.auth.currentUserId;

    if (!uid) {
      this.loading = false;
      return;
    }

    this.profileService.getProfile(uid).subscribe((p) => {
      this.profile = p;
      this.loading = false;

      if (p) {
        this.editableName = p.displayName;
        this.selectedAvatar = p.avatarUrl;
      }
    });
  }

  onAvatarSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.selectedAvatar = reader.result as string;
      this.success = 'Avatar loaded (not saved yet).';
    };
    reader.readAsDataURL(file);
  }

  async saveProfile() {
    if (!this.profile) return;

    this.saving = true;
    this.error = '';
    this.success = '';

    try {
      await this.profileService.updateProfile(this.profile.uid, {
        displayName: this.editableName,
        avatarUrl: this.selectedAvatar
      });

      this.success = 'Profile saved!';
    } catch {
      this.error = 'Failed to save profile';
    }

    this.saving = false;
  }
}