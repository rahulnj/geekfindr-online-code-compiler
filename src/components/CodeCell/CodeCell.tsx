import { useEffect, useState } from 'react';

import './CodeCell.css'

import { CodeEditor, Preview, Resizable } from '../../components';
import bundle from '../../bundler'
import { Cell } from '../../state';
import { useActions } from '../../hooks/useActions';


interface CodeCellProps {
    cell: Cell
}



const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {


    const [code, setCode] = useState('');
    const [err, setErr] = useState('');

    const { updateCell } = useActions()

    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundle(cell.content)
            setCode(output.code);
            setErr(output.err);
        }, 750);
        return () => {
            clearTimeout(timer);
        }
    }, [cell.content])






    return (
        <Resizable direction='vertical'>
            <div className='codecell'>
                <Resizable direction='horizontal'>
                    <CodeEditor
                        initialvalue={cell.content}
                        onChange={(value) => updateCell(cell.id, value)}
                    />
                </Resizable>
                <Preview code={code} err={err} />
            </div >
        </Resizable>
    )

}

export default CodeCell;
