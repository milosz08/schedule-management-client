import {
  Component,
  ContentChild,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { ScheduleNavList } from '~/root-module/models/schedule-nav-list.model';
import { ScheduleNavigationService } from '~/root-module/services/schedule-navigation/schedule-navigation.service';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';

@Component({
  selector: 'app-first-level-nav-tree',
  templateUrl: './first-level-nav-tree.component.html',
})
export class FirstLevelNavTreeComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @ContentChild(TemplateRef) contentChildRef!: TemplateRef<unknown> | null;

  departments: ScheduleNavList[] = [];

  isLoading$ = this._scheduleNavigationService.isLoading$;

  constructor(
    private readonly _scheduleNavigationService: ScheduleNavigationService
  ) {
    super();
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }
  ngOnInit(): void {
    this.wrapAsObservable$(
      this._scheduleNavigationService.fetchDepartments$()
    ).subscribe(departments => (this.departments = departments));
  }
}
