import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';
import {Shop} from 'src/app/models/shop';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopsComponent {
  @Input() public value: ReadonlyArray<Shop> = [];
}
