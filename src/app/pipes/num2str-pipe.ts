import {Pipe, PipeTransform} from '@angular/core';

/**
 * Подбирает нужную текстовую форму к числу
 */
@Pipe({
    name: 'num2Str'
})
export class Num2StrPipe implements PipeTransform {
    // tslint:disable-next-line: no-any
    public transform<T>(value: number, textForms: string[]): string {
        return `${value} ${this.do(value, textForms)}`;
    }

    private do(count: number, textForms: string[]): string {
        let unit = '';

        if (count >= 11 && count <= 13) {
            unit = textForms[2];
        } else {
            const lastNumber = count % 10;

            if (lastNumber === 0 || (lastNumber >= 5 && lastNumber <= 9)) {
                unit = textForms[2];
            } else if (lastNumber === 1) {
                unit = textForms[0];
            } else if (lastNumber >= 2 && lastNumber <= 4) {
                unit = textForms[1];
            }
        }

        return unit;
    }
}
