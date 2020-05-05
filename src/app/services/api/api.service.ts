import {CreateWorkerShopReq} from './../../dtos/create-worker-shop.req.dto';
import {Specialist} from './../../models/specialist';
import {Observable, of, BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Shop} from 'src/app/models/shop';
import {HttpClient} from '@angular/common/http';
import {switchMap, tap} from 'rxjs/operators';

export const getShopsUrl = 'http://localhost:4200/shops';
export const getSpecialistUrl = 'http://localhost:4200/specialist';
export const createSpecialistUrl = 'http://localhost:4200/specialist';
export const removeSpecialistUrl = 'http://localhost:4200/specialist';
export const updateShopsForSpecialistUrl = 'http://localhost:4200/specialist/shops';

/**
 * Сервис для работы с сервисом АПИ
 *
 * TODO: при взаимодействии с бэком нужно юзать Dto, вместо прямых моделей
 * TODO: необходимо вынести url и endpoints в отдельный конфиг
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public shops$ = new BehaviorSubject<ReadonlyArray<Readonly<Shop>>>([]);
  public spesialists$ = new BehaviorSubject<ReadonlyArray<Readonly<Specialist>>>([]);

  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Получить список магазина
   */
  public getShops(): Observable<ReadonlyArray<Readonly<Shop>>> {
    return this.httpClient.get<ReadonlyArray<Readonly<Shop>>>(getShopsUrl).pipe(
      tap((response) => this.shops$.next(response)),
      switchMap(() => this.shops$.asObservable())
    );
  }

  /**
   * Получить список специалистов
   */
  public getSpecialist(): Observable<ReadonlyArray<Readonly<Specialist>>> {
    return this.httpClient.get<ReadonlyArray<Specialist>>(getSpecialistUrl).pipe(
      tap((response) => this.spesialists$.next(response)),
      switchMap(() => this.spesialists$.asObservable())
    );
  }

  /**
   * Создать специалиста
   */
  public createSpecialist(dto: Readonly<Specialist>): Observable<Readonly<Specialist>> {
    return this.httpClient.post<Readonly<Specialist>>(createSpecialistUrl, dto).pipe(
      tap((response) => this.spesialists$.next(this.spesialists$.value.concat([response])))
    );
  }

  /**
   * Удалить специалиста
   */
  public removeSpecialist(id: number): Observable<void> {
    return this.httpClient.delete<void>(removeSpecialistUrl, {params: {id: id.toString()}}).pipe(
      tap((response) => this.spesialists$.next(this.spesialists$.value.filter((s) => s.id !== id)))
    );
  }

  /**
   * Обновить магазины у специалиста
   */
  public updateShopsForSpecialist(dto: ReadonlyArray<Readonly<CreateWorkerShopReq>>): Observable<void> {
    return this.httpClient.put<void>(updateShopsForSpecialistUrl, dto);
  }
}
