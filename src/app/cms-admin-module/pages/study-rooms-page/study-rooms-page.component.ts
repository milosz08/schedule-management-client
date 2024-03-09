/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudyRoomData } from '~/cms-admin-module/models/entities.model';
import { StudyRoomHttpClientService } from '~/cms-admin-module/services/study-room-http-client/study-room-http-client.service';
import { DeleteContentService } from '~/cms-module/services/delete-content/delete-content.service';
import { PaginationService } from '~/cms-module/services/pagination/pagination.service';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';

@Component({
  selector: 'app-study-rooms-page',
  templateUrl: './study-rooms-page.component.html',
  host: { class: 'app__main-flex-columned' },
  providers: [PaginationService, DeleteContentService],
})
export class StudyRoomsPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  studyRooms: StudyRoomData[] = [];

  constructor(
    private readonly _paginationService: PaginationService,
    private readonly _deleteContentService: DeleteContentService,
    private readonly _studyRoomHttpClientService: StudyRoomHttpClientService
  ) {
    super();
    this._deleteContentService.setDeleteEndpoint('studyroom');
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._paginationService.withListenPaginatorValues$(
        this._studyRoomHttpClientService.getStudyRooms$.bind(
          this._studyRoomHttpClientService
        )
      )
    ).subscribe(studyRooms => (this.studyRooms = studyRooms));
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }
}
