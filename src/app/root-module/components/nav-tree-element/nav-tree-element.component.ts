import {
  Component,
  ContentChild,
  Input,
  OnDestroy,
  TemplateRef,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  ScheduleNavList,
  ScheduleNavParams,
} from '~/root-module/models/schedule-nav-list.model';
import { ScheduleNavigationService } from '~/root-module/services/schedule-navigation/schedule-navigation.service';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';

@Component({
  selector: 'app-nav-tree-element',
  templateUrl: './nav-tree-element.component.html',
})
export class NavTreeElementComponent
  extends AbstractReactiveProvider
  implements OnDestroy
{
  @Input() levelNr = 0;
  @Input() inheritLvlData?: ScheduleNavList;
  @Input() params!: ScheduleNavParams;
  @Input() dataFetchCallback$!: (
    params: ScheduleNavParams
  ) => Observable<ScheduleNavList[]>;

  @ContentChild(TemplateRef) contentChildRef!: TemplateRef<unknown> | null;

  fetchElements: ScheduleNavList[] = [];
  isOpen = false;
  isFetching$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly _scheduleNavigationService: ScheduleNavigationService
  ) {
    super();
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleGetNextLevelContent(): void {
    if (!this.isOpen) {
      this.wrapAsObservable$(
        this._scheduleNavigationService.fetchTreeNavigationData$(
          this.dataFetchCallback$,
          this.params,
          this.isFetching$
        )
      ).subscribe(fetchElements => (this.fetchElements = fetchElements));
    } else {
      this.fetchElements = [];
    }
    this.isOpen = !this.isOpen;
  }
}
