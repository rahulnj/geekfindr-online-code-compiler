import { useEffect } from 'react';

import './CodeCell.css'

import { CodeEditor, Preview, Resizable } from '../../components';

import { Cell } from '../../state';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';


interface CodeCellProps {
    cell: Cell
}



const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {

    const { updateCell, createBundle } = useActions()

    const bundle = useTypedSelector((state: any) => state.bundles[cell.id])

    useEffect(() => {
        const timer = setTimeout(async () => {
            createBundle(cell.id, cell.content)
        }, 750);
        return () => {
            clearTimeout(timer);
        }
    }, [cell.content, cell.id, createBundle])






    return (
        <Resizable direction='vertical'>
            <div className='codecell'>
                <Resizable direction='horizontal'>
                    <CodeEditor
                        initialvalue={cell.content}
                        onChange={(value) => updateCell(cell.id, value)}
                    />
                </Resizable>
                {bundle && <Preview code={bundle.code} err={bundle.err} />}
            </div >
        </Resizable>
    )

}

export default CodeCell;
