import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf',
})
export class CpfPipe implements PipeTransform {
  transform(value: string, valorOculto: boolean = false): string {
    let cpfFormat = value + '';

    cpfFormat = value.replace(
      /([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})/,
      '$1.$2.$3-$4'
    );
    if (valorOculto) {
      cpfFormat = cpfFormat.substr(0, 3) + '.XXX' + '.XXX' + cpfFormat.substr(11);
    }
    // xxx.xxx.xxx-xx
    // 012
    return cpfFormat;
  }
}
