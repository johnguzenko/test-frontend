import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';

export interface PersonIcon {
  id: string | number;
  icon: string;
  active?: boolean | undefined;
}

@Component({
  selector: 'app-specialist-shelf',
  templateUrl: './specialist-shelf.component.html',
  styleUrls: ['./specialist-shelf.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecialistShelfComponent {
  @Input() public value: ReadonlyArray<Readonly<PersonIcon>> = [];
  @Output() public add = new EventEmitter<void>();
  @Output() public selectItem = new EventEmitter<Readonly<PersonIcon>>();

  /**
   * Событие нажатия на "Добавить"
   */
  public onClickAddBtn(): void {
    this.add.emit();
  }

  /**
   * Выбор элемента
   */
  public onSelectItem(item: Readonly<PersonIcon>): void {
    this.selectItem.next(item);
  }

  public trackItems(index, item: Readonly<PersonIcon>): string | number {
    return item.icon;
  }
}
