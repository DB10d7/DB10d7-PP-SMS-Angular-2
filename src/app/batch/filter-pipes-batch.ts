import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchFilter' })
export class FilterPipeBatch implements PipeTransform {
  // /**
  //  * Pipe filters the list of elements based on the search text provided
  //  *
  //  * @param items list of elements to search in
  //  * @param searchText search string
  //  * @returns list of elements filtered by search text or []
  //  */
  transform(items: any[], searchText: string): any[] {
    console.log(items);
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(item => 
       item.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );
  }
}