import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardWithPlotData } from '~/cms-module/models/dashboard-details.model';
import { DashboardService } from '~/cms-module/services/dashboard/dashboard.service';
import { PlotDotColor } from '~/cms-module/types/plot-dot-color.type';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';
import { CurrentLoggedUser } from '~/shared-module/models/identity.model';
import { IdentityService } from '~/shared-module/service/identity/identity.service';
import { SessionService } from '~/shared-module/service/session/session.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  providers: [DashboardService],
})
export class DashboardPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  dashboardDetails?: DashboardWithPlotData;
  currentLoggedUser?: CurrentLoggedUser;

  fetchingState$ = this._dashboardService.fetchingState$;
  loadingFor$ = this._dashboardService.loadingFor$;

  sessionSoonEnded$ = this._sessionService.sessionSoonEnded$;
  sessionCurrentTime$ = this._sessionService.sessionCurrentTime$;

  readonly rolesPlot: PlotDotColor[] = [
    'administrator',
    'editor',
    'teacher',
    'student',
  ];

  readonly elementsPlot: PlotDotColor[] = [
    'study-group',
    'study-subject',
    'study-spec',
    'study-room',
    'cathedral',
    'department',
  ];

  constructor(
    private readonly _dashboardService: DashboardService,
    private readonly _identityService: IdentityService,
    private readonly _sessionService: SessionService
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(this._identityService.currentLoggedUser$).subscribe(
      currentLoggedUser => (this.currentLoggedUser = currentLoggedUser)
    );
    this.wrapAsObservable$(
      this._dashboardService.fetchDashboardDetails$()
    ).subscribe(dashboardDetails => (this.dashboardDetails = dashboardDetails));
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleRefetchData(): void {
    this._dashboardService.refetchData();
  }

  handleAddChangeUserImage(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.wrapAsObservable$(
        this._dashboardService.updateProfileImage$(files[0])
      ).subscribe({
        complete: () => ((event.target as HTMLInputElement).value = ''),
      });
    }
  }

  handleDeleteUserImage(): void {
    this.wrapAsObservable$(
      this._dashboardService.deleteProfileImage$()
    ).subscribe();
  }
}
