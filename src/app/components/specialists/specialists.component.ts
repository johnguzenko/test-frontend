import {Component, ChangeDetectionStrategy, Input, EventEmitter, Output} from '@angular/core';
import {Specialist} from 'src/app/models/specialist';
import {PersonIcon} from '../specialist-shelf/specialist-shelf.component';

@Component({
  selector: 'app-specialists',
  templateUrl: './specialists.component.html',
  styleUrls: ['./specialists.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecialistsComponent {
  @Input() public set value(values: ReadonlyArray<Specialist>) {
    this.items = values;
    // Выберем просто 1ого специалиста
    this.icons = values.map((v, index) => ({id: v.id, icon: v.logo, active: index === 0}));
    this.selectedSpecialist = values.length ? values[0] : null;
  }

  @Output() public addSpecialist = new EventEmitter<void>();

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
    this.selectedSpecialist = this.items.find((i) => i.id === item.id) || null;
    this.icons = this.icons.map((i) => {
      return {
        ...i,
        active: i === item
      };
    });
  }
}
