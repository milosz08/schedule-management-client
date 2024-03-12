/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudySpecializationData } from '~/cms-admin-module/models/study-spec.model';
import { StudySpecializationHttpClientService } from '~/cms-admin-module/services/study-specialization-http-client/study-specialization-http-client.service';
import { DeleteContentService } from '~/cms-module/services/delete-content/delete-content.service';
import { PaginationService } from '~/cms-module/services/pagination/pagination.service';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';

@Component({
  selector: 'app-study-specializations-page',
  templateUrl: './study-specializations-page.component.html',
  host: { class: 'app__main-flex-columned' },
  providers: [PaginationService, DeleteContentService],
})
export class StudySpecializationsPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  studySpecializations: StudySpecializationData[] = [];

  constructor(
    private readonly _paginationService: PaginationService,
    private readonly _deleteContentService: DeleteContentService,
    private readonly _studySpecializationHttpClientService: StudySpecializationHttpClientService
  ) {
    super();
    this._deleteContentService.setDeleteEndpoint('studyspec');
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._paginationService.withListenPaginatorValues$(
        this._studySpecializationHttpClientService.getStudySpecializations$.bind(
          this._studySpecializationHttpClientService
        )
      )
    ).subscribe(
      studySpecializations => (this.studySpecializations = studySpecializations)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }
}
