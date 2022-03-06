import React, { Fragment } from "react";

import { AddCell, CellListItem } from "..";
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { Cell } from "../../state";




const CellList: React.FC = () => {
    const cells = useTypedSelector(({ cells: { order, data } }: any) =>
        order.map((id: string) => data[id])
    );

    const renderedCells = cells.map((cell: Cell) => (
        <Fragment key={cell.id}>
            <CellListItem cell={cell} />
            <AddCell previousCellId={cell.id} />
        </Fragment>
    ))
    return (
        <div>
            <AddCell forceVisible={cells.length === 0} previousCellId={null} />
            {renderedCells}
        </div>
    )
}

export default CellList