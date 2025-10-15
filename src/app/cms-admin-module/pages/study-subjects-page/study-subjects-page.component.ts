import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudySubjectData } from '~/cms-admin-module/models/study-subject.model';
import { StudySubjectHttpClientService } from '~/cms-admin-module/services/study-subject-http-client/study-subject-http-client.service';
import { DeleteContentService } from '~/cms-module/services/delete-content/delete-content.service';
import { PaginationService } from '~/cms-module/services/pagination/pagination.service';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';

@Component({
  selector: 'app-study-subjects-page',
  templateUrl: './study-subjects-page.component.html',
  host: { class: 'app__main-flex-columned' },
  providers: [PaginationService, DeleteContentService],
})
export class StudySubjectsPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  studySubjects: StudySubjectData[] = [];

  constructor(
    private readonly _paginationService: PaginationService,
    private readonly _deleteContentService: DeleteContentService,
    private readonly _studySubjectHttpClientService: StudySubjectHttpClientService
  ) {
    super();
    this._deleteContentService.setDeleteEndpoint('studysubject');
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._paginationService.withListenPaginatorValues$(
        this._studySubjectHttpClientService.getStudySubjects$.bind(
          this._studySubjectHttpClientService
        )
      )
    ).subscribe(studySubjects => (this.studySubjects = studySubjects));
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }
}
