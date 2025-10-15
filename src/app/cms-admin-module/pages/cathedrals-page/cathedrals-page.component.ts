import { Component, OnDestroy, OnInit } from '@angular/core';
import { CathedralData } from '~/cms-admin-module/models/cathedral.model';
import { CathedralHttpClientService } from '~/cms-admin-module/services/cathedral-http-client/cathedral-http-client.service';
import { DeleteContentService } from '~/cms-module/services/delete-content/delete-content.service';
import { PaginationService } from '~/cms-module/services/pagination/pagination.service';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';

@Component({
  selector: 'app-cathedrals-page',
  templateUrl: './cathedrals-page.component.html',
  host: { class: 'app__main-flex-columned' },
  providers: [PaginationService, DeleteContentService],
})
export class CathedralsPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  cathedrals: CathedralData[] = [];

  constructor(
    private readonly _paginationService: PaginationService,
    private readonly _deleteContentService: DeleteContentService,
    private readonly _cathedralHttpClientService: CathedralHttpClientService
  ) {
    super();
    this._deleteContentService.setDeleteEndpoint('cathedral');
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._paginationService.withListenPaginatorValues$(
        this._cathedralHttpClientService.getCathedrals$.bind(
          this._cathedralHttpClientService
        )
      )
    ).subscribe(cathedrals => (this.cathedrals = cathedrals));
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }
}
