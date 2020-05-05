import {CreateWorkerShopReq} from './../../dtos/create-worker-shop.req.dto';
import {Specialist} from './../../models/specialist';
import {Observable, BehaviorSubject, combineLatest, of} from 'rxjs';
import {shareReplay, take, map, tap, filter, merge, switchMap, mergeMap, withLatestFrom} from 'rxjs/operators';
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
  public readonly allSpecialists$ = new BehaviorSubject<ReadonlyArray<Readonly<Specialist>>>([]);
  public readonly selectedSpecialistId$ = new BehaviorSubject<number>(0);
  public readonly selectedSpecialist$ = new BehaviorSubject<Readonly<Specialist> | null>(null);
  // public readonly selectedSpecialist: Readonly<Specialist> | null =;
  public readonly selectedShops$: Observable<ReadonlyArray<Shop>>;

  constructor(private readonly apiService: ApiService) {
    this.shops$ = this.apiService.getShops().pipe(shareReplay());
    this.specialists$ = combineLatest(this.shops$, this.apiService.getSpecialist()).pipe(
      tap(([shops, specialists]) => this.mergeCurrentSpecialistsWithAll(specialists)),
      mergeMap(() => this.allSpecialists$.asObservable()),
      tap((specialists) => {
        const currentSpeialist = this.selectedSpecialist$.value;
        if (!currentSpeialist) {
          this.selectedSpecialist$.next(specialists[0]);
        } else {
          const updatedSpecialist = specialists.find((s) => s.id === currentSpeialist.id);
          this.selectedSpecialist$.next(updatedSpecialist);
        }
      }),
      shareReplay()
    );

    this.selectedShops$ = combineLatest(
      this.selectedSpecialist$,
      this.shops$
    ).pipe(
      mergeMap(([spec, shops]) => {
        if (spec && spec.shopIds && spec.shopIds.length) {
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

    const allSpecs = this.allSpecialists$.value;
    this.allSpecialists$.next(allSpecs.map((s) => s.id === updatedSpecialist.id ? updatedSpecialist : s));
  }

  public removeShop(data: Readonly<Shop>): void {
    const currentSpecialist = this.selectedSpecialist$.value;

    const updatedSpecialist = {
      ...currentSpecialist,
      shopIds: currentSpecialist.shopIds.filter((s) => s !== data.id),
      shops: currentSpecialist.shops.filter((s) => s.id !== data.id)
    };

    const allSpecs = this.allSpecialists$.value;
    this.allSpecialists$.next(allSpecs.map((s) => s.id === updatedSpecialist.id ? updatedSpecialist : s));
  }

  public saveChanges(): void {
    // Сохранить все магазины у специалистов
    const payloadsArr = this.allSpecialists$.value.map((notSavedSpec) => {
      const currentShops = notSavedSpec.shopIds;
      const payload: CreateWorkerShopReq[] = currentShops.map((s) => ({shopId: s, specialistId: notSavedSpec.id}));
      return payload;
    });

    const requests = [].concat.apply([], payloadsArr);
    this.apiService.updateShopsForSpecialist(requests).subscribe();
  }

  private mergeCurrentSpecialistsWithAll(all: ReadonlyArray<Readonly<Specialist>>): void {
    // Добавим в конец нового специалиста и не тронем изменениями всех текущих, т.к. у них есть несохраненное состояние
    // + смапим магазины
    const currentSpecs = this.allSpecialists$.value;

    const allSpec = all.map((a) => {
      const currentSpec = currentSpecs.find((s) => s.id === a.id) || a;
      return {
        ...currentSpec,
        shops: this.apiService.shops$.value.filter((shop) => currentSpec.shopIds.includes(shop.id))
      };
    });

    this.allSpecialists$.next(allSpec);
  }
}
