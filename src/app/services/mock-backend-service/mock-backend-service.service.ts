import {Specialist} from './../../models/specialist';
import {shops, specialistLogo} from './mock-data';
import {Observable, of} from 'rxjs';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {getShopsUrl, getSpecialistUrl, createSpecialistUrl} from '../api/api.service';

@Injectable()
export class MockBackendServiceService implements HttpInterceptor {

  constructor(private readonly injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Получить список магазина с бэкенда
    if (request.method === 'GET' && request.url === getShopsUrl) {
      return of(new HttpResponse({status: 200, body: shops}));
    }

    // Получить список созданных специалистов
    if (request.method === 'GET' && request.url === getSpecialistUrl) {
      const specialists = (JSON.parse(localStorage.getItem('specialists') || '[]'));
      return of(new HttpResponse({status: 200, body: specialists}));
    }

    // Получить список созданных специалистов
    if (request.method === 'POST' && request.url === createSpecialistUrl) {
      const specialists = (JSON.parse(localStorage.getItem('specialists') || '[]')) as ReadonlyArray<Specialist>;
      // Добавим валидацию "на бэке"
      const specialist = {
        id: specialists.length + 1,
        fullName: `Person FIO ${specialists.length + 1}`,
        logo: specialistLogo
      } as Specialist;
      localStorage.setItem('specialists', JSON.stringify(specialists.concat([specialist])));
      return of(new HttpResponse({status: 200, body: specialist}));
    }

    next.handle(request);
  }
}
