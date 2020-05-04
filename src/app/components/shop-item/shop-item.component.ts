import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';
import {Shop} from 'src/app/models/shop';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopItemComponent {
  @Input() public value: Readonly<Shop> | null = null;
}
