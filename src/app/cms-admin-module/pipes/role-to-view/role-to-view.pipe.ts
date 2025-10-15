import { Pipe, PipeTransform } from '@angular/core';
import { UserIdentityType } from '~/shared-module/types/user-identity.type';

@Pipe({ name: 'roleToView' })
export class RoleToViewPipe implements PipeTransform {
  transform(role: UserIdentityType): { label: string; class: string } {
    const baseClass = 'app-cms__table-user-role';
    switch (role) {
      case UserIdentityType.ADMINISTRATOR:
        return { label: 'administrator', class: `${baseClass}--administrator` };
      case UserIdentityType.EDITOR:
        return { label: 'edytor', class: `${baseClass}--editor` };
      case UserIdentityType.TEACHER:
        return { label: 'nauczyciel', class: `${baseClass}--teacher` };
      default:
        return { label: 'student', class: `${baseClass}--student` };
    }
  }
}
