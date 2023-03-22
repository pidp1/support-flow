import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefone'
})
export class TelefonePipe implements PipeTransform {

  transform(value: number): string {
    let tellFormat = value  + '';

    tellFormat = value.toString().replace(/([0-9]{2})?([0-9]{1})?([0-9]{4})?([0-9]{4}$)/, '($1) $2 $3-$4');
    return tellFormat
  }

}
//let tellFormat = value + '';
//tellFormat = value
//.toString()
//.replace(/([0-9]{2})([0-9]{1})([0-9]{4})([0-9]{4})/, '($1) $2 $3-$4');