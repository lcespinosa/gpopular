
import {NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder} from 'ng-zorro-antd/table';

export interface FilterableColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}
