import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(list: any[], field?: string, keyWord?: string): any[] {
    if (!(field && keyWord)) {
      return list;
    }
    return list.filter(item => item[field].indexOf(keyWord) >= 0);
  }

}
