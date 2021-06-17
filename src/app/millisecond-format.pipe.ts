import { Pipe, PipeTransform } from '@angular/core';
/*
 * Add string to ms time
*/
@Pipe({name: 'millisecondFormat'})
export class MillisecondFormatPipe implements PipeTransform {
  transform(value: number): string {
    return value + 'ms for request to complete';
  }
}