// Reusable client-side column sorting for plain (non-b-table) admin tables.
//
// Usage in a component:
//   import tableSort from '@/mixins/tableSort';
//   export default {
//     mixins: [tableSort],
//     computed: {
//       sortedRows() {
//         return this.sortRows(this.rows);
//       },
//     },
//   };
//
// In the template, bind each sortable column heading:
//   <th @click="sortBy('name')" style="cursor:pointer">
//     Name <span v-if="sortKey === 'name'">{{ sortIndicator('name') }}</span>
//   </th>
//   <tr v-for="row in sortedRows" :key="row.id">...</tr>
//
// `sortRows(rows, getter)` takes an optional `getter(row, key)` function for
// columns whose displayed value isn't a plain `row[key]` property (e.g. a
// value derived from a nested object, or built from more than one field).
// When omitted it falls back to `row[sortKey]`.
export default {
  data() {
    return {
      sortKey: '',
      sortDir: 'asc',
    };
  },
  methods: {
    // Click handler for a column heading. First click on a column sorts
    // ascending; clicking the same column again toggles to descending (and
    // back), matching the ▲/▼ indicator rendered via `sortIndicator`.
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortDir = 'asc';
      }
    },
    // Arrow indicator for the active sort column; empty string otherwise.
    sortIndicator(key) {
      if (this.sortKey !== key) return '';
      return this.sortDir === 'asc' ? '▲' : '▼';
    },
    // Returns a *new* sorted array; leaves the original `rows` untouched.
    sortRows(rows, getter) {
      if (!Array.isArray(rows)) return [];
      if (!this.sortKey) return rows.slice();

      const key = this.sortKey;
      const valueFn = typeof getter === 'function' ? getter : (row) => (row ? row[key] : undefined);

      const sorted = rows.slice().sort((a, b) => this._compareSortValues(valueFn(a, key), valueFn(b, key)));
      return this.sortDir === 'desc' ? sorted.reverse() : sorted;
    },
    // Compares two raw values: dates chronologically, numbers numerically,
    // booleans grouped (false before true), everything else as
    // case-insensitive strings. Empty/null/undefined values sort last.
    _compareSortValues(a, b) {
      const aEmpty = a === null || a === undefined || a === '';
      const bEmpty = b === null || b === undefined || b === '';
      if (aEmpty && bEmpty) return 0;
      if (aEmpty) return -1;
      if (bEmpty) return 1;

      if (typeof a === 'boolean' || typeof b === 'boolean') {
        return (a ? 1 : 0) - (b ? 1 : 0);
      }

      const aDate = this._parseDate(a);
      const bDate = this._parseDate(b);
      if (aDate !== null && bDate !== null) {
        return aDate - bDate;
      }

      const aNum = this._parseNumber(a);
      const bNum = this._parseNumber(b);
      if (aNum !== null && bNum !== null) {
        return aNum - bNum;
      }

      return String(a).toLowerCase().localeCompare(String(b).toLowerCase());
    },
    // Only treats a string as a date when it actually looks like one, so
    // plain numeric strings/ids aren't misread as dates.
    _parseDate(value) {
      if (value instanceof Date && !isNaN(value.getTime())) return value.getTime();
      if (typeof value === 'string' && /\d{4}-\d{2}-\d{2}|^\d{1,2}\/\d{1,2}\/\d{4}/.test(value)) {
        const parsed = Date.parse(value);
        if (!isNaN(parsed)) return parsed;
      }
      return null;
    },
    _parseNumber(value) {
      if (typeof value === 'number' && !isNaN(value)) return value;
      if (typeof value === 'string' && value.trim() !== '' && !isNaN(Number(value))) {
        return Number(value);
      }
      return null;
    },
  },
};
