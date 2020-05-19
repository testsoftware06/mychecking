import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'tagFormat'})
export class TagFormat implements PipeTransform {

  swap32(val: string) {
    return parseInt('0x'+val.match(/../g).reverse().join(''));
  }


  transform(value: string, ...args: any[]) {
    return this.swap32(value);
  }

}
