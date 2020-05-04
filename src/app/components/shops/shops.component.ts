import {Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
import {Shop} from 'src/app/models/shop';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopsComponent {
  @Input() public value: ReadonlyArray<Readonly<Shop>> = [];
  @Output() public selectShop = new EventEmitter<Readonly<Shop>>();

  public onSelectShop(item: Readonly<Shop>): void {
    this.selectShop.emit(item);
  }
}
