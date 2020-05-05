import {Component, ChangeDetectionStrategy, Input, EventEmitter, Output} from '@angular/core';
import {Specialist} from 'src/app/models/specialist';
import {PersonIcon} from '../specialist-shelf/specialist-shelf.component';
import {Shop} from 'src/app/models/shop';

@Component({
  selector: 'app-specialists',
  templateUrl: './specialists.component.html',
  styleUrls: ['./specialists.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecialistsComponent {
  @Input() public set value(values: ReadonlyArray<Readonly<Specialist>>) {
    this.items = values;
    this.icons = values.map((v, index) => ({id: v.id, icon: v.logo, active: this.selectedSpecialist === v}));
  }

  @Input() public set active(value: Readonly<Specialist>) {
    // console.log('active', value);
    this.selectedSpecialist = value;
    // Выберем просто 1ого специалиста
    this.icons = this.icons.map((v, index) => ({...v, active: value.id === v.id}));
  }

  @Output() public addSpecialist = new EventEmitter<void>();
  @Output() public removeSpecialist = new EventEmitter<Readonly<Specialist>>();
  @Output() public selectSpecialist = new EventEmitter<Readonly<Specialist>>();
  @Output() public removeShop = new EventEmitter<Readonly<Shop>>();

  public items: ReadonlyArray<Specialist> = [];
  public icons: ReadonlyArray<Readonly<PersonIcon>> = [];
  public selectedSpecialist: Readonly<Specialist> | null = null;

  /**
   * Событие добавления специалиста
   */
  public onAddSpecialist(): void {
    this.addSpecialist.emit();
  }

  /**
   * Выбор специалиста
   */
  public onSelectSpecialist(item: Readonly<PersonIcon>): void {
    this.selectSpecialist.emit(this.items.find((i) => i.id === item.id));
  }

  /**
   * Удаление выбранного специалиста
   */
  public onRemoveItem(item: Readonly<Specialist>): void {
    this.removeSpecialist.emit(item);
  }

  /**
   * Удаление выбранного специалиста
   */
  public onRemoveShopFromItem(item: Readonly<Shop>): void {
    this.removeShop.emit(item);
  }
}
