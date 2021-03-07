import { Editor, Path, Transforms } from 'slate';
import { getAbove } from '@udecode/slate-plugins';
import { someNode } from '@udecode/slate-plugins';
import { setDefaults } from '@udecode/slate-plugins';
import { DEFAULTS_TABLE } from './defaults';
import { TableOptions } from '@udecode/slate-plugins';
import { getEmptyCellNode } from './getEmptyCellNode';

export const addColumn = (editor: Editor, options?: TableOptions) => {
  const { table, td, th } = setDefaults(options, DEFAULTS_TABLE);

  if (someNode(editor, { match: { type: table.type } })) {
    const currentCellItem = getAbove(editor, {
      match: { type: [td.type, th.type] },
    });

    const currentTableItem = getAbove(editor, { match: { type: table.type } });

    if (currentCellItem && currentTableItem) {
      const nextCellPath = Path.next(currentCellItem[1]);
      const newCellPath = nextCellPath.slice();
      const replacePathPos = newCellPath.length - 2;
      const currentRowIdx = nextCellPath[replacePathPos];

      currentTableItem[0].children.forEach((row, rowIdx) => {
        newCellPath[replacePathPos] = rowIdx;

        Transforms.insertNodes(editor, getEmptyCellNode({ ...options }), {
          at: newCellPath,
          select: rowIdx === currentRowIdx,
        });
      });
    }
  }
};
export default addColumn;