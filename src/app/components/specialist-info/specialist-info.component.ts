import {Specialist} from './../../models/specialist';
import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {Shop} from 'src/app/models/shop';

@Component({
  selector: 'app-specialist-info',
  templateUrl: './specialist-info.component.html',
  styleUrls: ['./specialist-info.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecialistInfoComponent {
  @Input() public value: Readonly<Specialist> | null = null;
  @Output() public trashClick = new EventEmitter<void>();
  @Output() public trashShopClick = new EventEmitter<Shop>();

  /**
   * Удаление элемента
   */
  public onClickTrash(): void {
    this.trashClick.emit();
  }

  /**
   * Удаление магазина из специалиста
   */
  public onClickTrashShop(item: Readonly<Shop>): void {
    this.trashShopClick.emit(item);
  }
}
