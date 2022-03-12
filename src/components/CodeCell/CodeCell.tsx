import { useEffect } from 'react';

import './CodeCell.css'

import { CodeEditor, Preview, Resizable } from '../../components';

import { Cell } from '../../state';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useCummulativeCode } from '../../hooks/useCummulativeCode';


interface CodeCellProps {
    cell: Cell
}



const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {

    const { updateCell, createBundle } = useActions()
    const bundle = useTypedSelector((state: any) => state.bundles[cell.id])
    const cumulativeCode = useCummulativeCode(cell.id)

    useEffect(() => {
        if (!bundle) {
            createBundle(cell.id, cumulativeCode)
            return;
        }
        const timer = setTimeout(async () => {
            createBundle(cell.id, cumulativeCode)
        }, 750);
        return () => {
            clearTimeout(timer);
        }
    }, [cumulativeCode, cell.id, createBundle])






    return (
        <Resizable direction='vertical'>
            <div className='codecell'>
                <Resizable direction='horizontal'>
                    <CodeEditor
                        initialvalue={cell.content}
                        onChange={(value) => updateCell(cell.id, value)}
                    />
                </Resizable>
                <div className="progress-wrapper">
                    {!bundle || bundle.loading ? (
                        <div className='progress-cover'>
                            <progress className='progress is-small is-primary' max="100">
                                Loading
                            </progress>
                        </div>
                    ) : (
                        <Preview code={bundle.code} err={bundle.err} />
                    )}
                </div>
            </div>
        </Resizable>
    )

}

export default CodeCell;
