import { useEffect, useState } from 'react';

import './CodeCell.css'

import { CodeEditor, Preview, Resizable } from '../../components';
import bundle from '../../bundler'


const CodeCell = () => {


    const [code, setCode] = useState('')
    const [input, setInput] = useState('');

    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundle(input)
            setCode(output);
        }, 750);
        return () => {
            clearTimeout(timer);
        }
    }, [input])






    return (
        <Resizable direction='vertical'>
            <div className='codecell'>
                <Resizable direction='horizontal'>
                    <CodeEditor
                        initialvalue='console.log("hello world")'
                        onChange={(value) => setInput(value)}
                    />
                </Resizable>
                <Preview code={code} />
            </div >
        </Resizable>
    )

}

export default CodeCell;
