"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table = table;
const format_table_cell_1 = require("../utils/format-table-cell");
/**
 * Comments for table
 * @param headers
 * @param rows
 */
function table(headers, rows, headerLeftAlign = false) {
    return `\n| ${headers.join(' | ')} |\n| ${headers
        .map(() => `${headerLeftAlign ? ':' : ''}------`)
        .join(' | ')} |\n${rows.map((row) => `| ${row.map((cell) => (0, format_table_cell_1.formatTableCell)(cell)).join(' | ')} |\n`).join('')}`;
}
