import {Specialist} from './../../models/specialist';
import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-specialist-info',
  templateUrl: './specialist-info.component.html',
  styleUrls: ['./specialist-info.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecialistInfoComponent {
  @Input() public value: Readonly<Specialist> | null = null;
  @Output() public trashClick = new EventEmitter<void>();

  /**
   * Удаление элемента
   */
  public onClickTrash(): void {
    this.trashClick.emit();
  }
}
