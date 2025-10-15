import { Component, Input, OnInit } from '@angular/core';
import { UserIdentityType } from '~/shared-module/types/user-identity.type';
import { UserRoleSingleLetterType } from '~/shared-module/types/user-role-single-letter.type';
import { createUserRoleSingleLetter } from '~/shared-module/utils/user-account.utils';

@Component({
  selector: 'app-user-role-dot',
  templateUrl: './user-role-dot.component.html',
  styleUrl: './user-role-dot.component.scss',
})
export class UserRoleDotComponent implements OnInit {
  @Input() userRole = UserIdentityType.UNDEFINED;
  @Input() isLetterShowing = true;
  @Input() isDarkTheme = false;

  roleLetter?: UserRoleSingleLetterType;

  ngOnInit(): void {
    this.roleLetter = createUserRoleSingleLetter(this.userRole);
  }
}
