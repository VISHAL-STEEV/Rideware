import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchpipe',
  standalone: true
})
export class SearchpipePipe implements PipeTransform {

  transform(value: any[], args?: any): any[] { // Explicitly set the return type to any[]
    if (!value) {
      return [];
    }
    if (!args) {
      return value;
    }

    args = args.toLowerCase();

    return value.filter((item: any) => JSON.stringify(item).toLowerCase().includes(args));
  }

}
