
import {NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder} from 'ng-zorro-antd/table';

export interface SearchableColumnItem {
  name: string;
  data: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn | null;
  sortDirections: NzTableSortOrder[];
  searchable: boolean;
  searchVisible: boolean;
  searchValue: string;
  priority: number|boolean;
}
