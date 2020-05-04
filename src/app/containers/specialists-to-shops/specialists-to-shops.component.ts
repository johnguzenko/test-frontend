import {Specialist} from './../../models/specialist';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';
import {ApiService} from './../../services/api/api.service';
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Shop} from 'src/app/models/shop';

@Component({
  selector: 'app-specialists-to-shops',
  templateUrl: './specialists-to-shops.component.html',
  styleUrls: ['./specialists-to-shops.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecialistsToShopsComponent {
  public readonly shops$: Observable<ReadonlyArray<Shop>>;
  public readonly specialists$: Observable<ReadonlyArray<Readonly<Specialist>>>;

  constructor(private readonly apiService: ApiService) {
    this.shops$ = this.apiService.getShops().pipe(shareReplay());
    this.specialists$ = this.apiService.getSpecialist().pipe(shareReplay());
  }

  /**
   * Создать специалиста
   * TODO: здесь по идее должен приходить в параметры специалист с данными
   */
  public createSpecialist(data: Readonly<Specialist>): void {
    this.apiService.createSpecialist(data).subscribe();
  }

  public removeSpecialist(data: Readonly<Specialist>): void {
    this.apiService.removeSpecialist(data.id).subscribe();
  }
}
