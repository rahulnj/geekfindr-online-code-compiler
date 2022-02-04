import { useState } from 'react';

import './CodeCell.css'

import { CodeEditor, Preview, Resizable } from '../../components';
import bundle from '../../bundler'


const CodeCell = () => {


    const [code, setCode] = useState('')
    const [input, setInput] = useState('');





    const submitHandler = async () => {
        const output = await bundle(input)
        setCode(output);
    };



    return (
        <Resizable direction='vertical'>
            <div className='codecell'>
                <CodeEditor
                    initialvalue='console.log("hello world")'
                    onChange={(value) => setInput(value)}
                />
                <Preview code={code} />
            </div >
        </Resizable>
    )

}

export default CodeCell;
