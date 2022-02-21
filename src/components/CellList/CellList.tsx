import { CellListItem } from "..";
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { Cell } from "../../state";



const CellList: React.FC = () => {
    const cells = useTypedSelector(({ cells: { order, data } }: any) =>
        order.map((id: string) => data[id])
    );

    const renderedCells = cells.map((cell: Cell) => <CellListItem key={cell.id} cell={cell} />)
    return (
        <div>{renderedCells}</div>
    )
}

export default CellList