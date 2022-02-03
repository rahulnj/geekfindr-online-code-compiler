import { useState } from 'react';


import { CodeEditor, Preview } from '../../components';
import bundle from '../../bundler'

const CodeCell = () => {


    const [code, setCode] = useState('')
    const [input, setInput] = useState('');





    const submitHandler = async () => {
        const output = await bundle(input)
        setCode(output);
    };



    return (
        <div>
            <CodeEditor
                initialvalue='console.log("hello world")'
                onChange={(value) => setInput(value)}
            />
            <div>
                <button onClick={submitHandler}>submit</button>
            </div>
            <Preview code={code} />
        </div>
    )

}

export default CodeCell;
