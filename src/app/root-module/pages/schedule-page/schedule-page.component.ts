import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ScheduleNavList,
  ScheduleNavParams,
} from '~/root-module/models/schedule-nav-list.model';
import { RememberScheduleBarService } from '~/root-module/services/remember-schedule-bar/remember-schedule-bar.service';
import { ScheduleNavigationHttpClientService } from '~/root-module/services/schedule-navigation-http-client/schedule-navigation-http-client.service';
import { ScheduleNavigationService } from '~/root-module/services/schedule-navigation/schedule-navigation.service';
import { ScheduleSubjectModalService } from '~/shared-module/service/schedule-subject-modal/schedule-subject-modal.service';

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrl: './schedule-page.component.scss',
  providers: [
    ScheduleNavigationService,
    ScheduleSubjectModalService,
    RememberScheduleBarService,
  ],
})
export class SchedulePageComponent {
  activeNav = 'grupy';

  readonly buttons = ['sale', 'pracownicy', 'grupy'];

  isModalOpen$ = this._scheduleSubjectModalService.isOpen$;

  constructor(
    private readonly _scheduleNavigationHttpClientService: ScheduleNavigationHttpClientService,
    private readonly _scheduleSubjectModalService: ScheduleSubjectModalService
  ) {}

  handleToggleActiveSection(section: string): void {
    this.activeNav = section;
  }

  handleFetchCathedrals$(
    params: ScheduleNavParams
  ): Observable<ScheduleNavList[]> {
    return this._scheduleNavigationHttpClientService.getCathedralsFromDepartment$(
      params['deptId']
    );
  }

  handleFetchStudyRooms$(
    params: ScheduleNavParams
  ): Observable<ScheduleNavList[]> {
    return this._scheduleNavigationHttpClientService.getStudyRoomsFromCathedral$(
      params['deptId'],
      params['cathId']
    );
  }

  handleFetchEmployers$(
    params: ScheduleNavParams
  ): Observable<ScheduleNavList[]> {
    return this._scheduleNavigationHttpClientService.getEmployersFromCathedral$(
      params['deptId'],
      params['cathId']
    );
  }

  handleFetchStudyDegrees$(
    params: ScheduleNavParams
  ): Observable<ScheduleNavList[]> {
    return this._scheduleNavigationHttpClientService.getDegreesBaseDepartment$(
      params['deptId']
    );
  }

  handleFetchStudySpecs$(
    params: ScheduleNavParams
  ): Observable<ScheduleNavList[]> {
    return this._scheduleNavigationHttpClientService.getStudySpecsBaseDegree$(
      params['deptId'],
      params['degreeId']
    );
  }

  handleFetchStudySemesters$(
    params: ScheduleNavParams
  ): Observable<ScheduleNavList[]> {
    return this._scheduleNavigationHttpClientService.getSemestersBaseStudyGroup$(
      params['deptId'],
      params['specId']
    );
  }

  handleFetchStudyGroups$(
    params: ScheduleNavParams
  ): Observable<ScheduleNavList[]> {
    return this._scheduleNavigationHttpClientService.getGroupsBaseStudySpecAndSem$(
      params['specId'],
      params['semId']
    );
  }
}
