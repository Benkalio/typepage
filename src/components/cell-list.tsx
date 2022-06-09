import React, { Fragment } from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';
import { Cell } from '../state';

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }: any) => {
    return order.map((id: string) => {
      return data[id];
    });
  });

  const renderedCells = cells.map((cell: Cell) => (
    <Fragment key={cell.id}>
      <AddCell nextCellId={cell.id} />
      <CellListItem cell={cell} />
    </Fragment>
  ));

  return (
    <div>
      {renderedCells}
      <AddCell forceVisible={cells.length === 0} nextCellId={null} />
    </div>
  );
};

export default CellList;
