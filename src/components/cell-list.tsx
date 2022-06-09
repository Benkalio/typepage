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
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div>
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
