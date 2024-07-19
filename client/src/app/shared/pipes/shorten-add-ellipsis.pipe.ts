import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenAddEllipsis',
  standalone: true
})
export class ShortenAddEllipsisPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const newValue = value.substring(0, 60) + '...'
    return newValue;
  }

}
