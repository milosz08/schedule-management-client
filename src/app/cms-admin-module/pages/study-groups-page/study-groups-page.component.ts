/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudyGroupData } from '~/cms-admin-module/models/entities.model';
import { StudyGroupHttpClientService } from '~/cms-admin-module/services/study-group-http-client/study-group-http-client.service';
import { DeleteContentService } from '~/cms-module/services/delete-content/delete-content.service';
import { PaginationService } from '~/cms-module/services/pagination/pagination.service';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';

@Component({
  selector: 'app-study-groups-page',
  templateUrl: './study-groups-page.component.html',
  host: { class: 'app__main-flex-columned' },
  providers: [PaginationService, DeleteContentService],
})
export class StudyGroupsPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  studyGroups: StudyGroupData[] = [];

  constructor(
    private readonly _paginationService: PaginationService,
    private readonly _deleteContentService: DeleteContentService,
    private readonly _studyGroupHttpClientService: StudyGroupHttpClientService
  ) {
    super();
    this._deleteContentService.setDeleteEndpoint('studygroup');
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._paginationService.withListenPaginatorValues$(
        this._studyGroupHttpClientService.getStudyGroups$.bind(
          this._studyGroupHttpClientService
        )
      )
    ).subscribe(studyGroups => (this.studyGroups = studyGroups));
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }
}
