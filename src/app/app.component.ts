import {Component} from '@angular/core';

/**
 * TODO:
 * - засунуть иконки в спрайт, для подгрузки 1 asset, вместо пачки
 * - для работы с бэк-сервисами создать dto и мапить данные при получении и отправке
 * - в dumb-компонентах абстрагироваться от конкретых сущностей тип Specialist и Shop,
 *   т.к. некоторые компоненты могут использоваться более универсально (т.к. сейчас нет абстракций, то и названия у них соответствующие)
 * - вынести общие стили в одно место
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'test-frontend';
}
