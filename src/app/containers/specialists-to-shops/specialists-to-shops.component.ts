import {Specialist} from 'src/app/models/specialist';
import {Specialist} from './../../models/specialist';
import {Observable, BehaviorSubject, combineLatest, of} from 'rxjs';
import {shareReplay, take, map, tap, filter, merge, switchMap, mergeMap} from 'rxjs/operators';
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
  public readonly selectedSpecialist$ = new BehaviorSubject<Readonly<Specialist> | null>(null);
  public readonly selectedShops$: Observable<ReadonlyArray<Shop>>;

  constructor(private readonly apiService: ApiService) {
    this.shops$ = this.apiService.getShops().pipe(shareReplay());
    this.specialists$ = this.apiService.getSpecialist().pipe(
      tap((resp) => this.selectedSpecialist$.next(resp[0] || null)),
      shareReplay()
    );

    this.selectedShops$ = combineLatest(
      this.selectedSpecialist$,
      this.shops$
    ).pipe(
      mergeMap(([spec, shops]) => {
        if (spec.shopIds && spec.shopIds.length) {
          const notSelectedShops = shops.filter((s) => !spec.shopIds.includes(s.id));
          return of(notSelectedShops);
        }
        return of(shops);
      })
    );
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

  public selectSpecialist(data: Readonly<Specialist>): void {
    this.selectedSpecialist$.next(data);
  }

  public selectShop(data: Readonly<Shop>): void {
    const currentSpecialist = this.selectedSpecialist$.value;
    const updatedSpecialist = {
      ...currentSpecialist,
      shopIds: (currentSpecialist.shopIds || []).concat([data.id]),
      shops: (currentSpecialist.shops || []).concat([data])
    };
    console.log(updatedSpecialist);

    this.selectedSpecialist$.next(updatedSpecialist);
  }
}
