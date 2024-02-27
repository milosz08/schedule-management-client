/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserIdentityType } from '~/shared-module/types/user-identity.type';

@Component({
  selector: 'app-user-profile-image',
  templateUrl: './user-profile-image.component.html',
  styleUrl: './user-profile-image.component.scss',
})
export class UserProfileImageComponent {
  @Input() profileImageUrl?: string | null = null;
  @Input() nameWithSurname? = '';
  @Input() role? = UserIdentityType.UNDEFINED;

  constructor(private readonly _sanitizer: DomSanitizer) {}

  getSaveImageURL(imageUrl: string): SafeUrl {
    return this._sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
}
