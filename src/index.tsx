import { useEffect, useRef, useState } from 'react';
import ReactDom from 'react-dom';

import 'bulmaswatch/superhero/bulmaswatch.min.css'
import * as esbuild from 'esbuild-wasm'

import { fetchPlugin, unpkgPathPlugin } from './plugins';
import { CodeEditor, Preview } from './components';


const App = () => {
    const ref = useRef<any>();

    const [code, setCode] = useState('')
    const [input, setInput] = useState('');

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
        })
    }

    useEffect(() => {
        startService()
    }, [])

    const submitHandler = async () => {
        if (!ref.current) {
            return;
        }



        const result = await ref.current.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(),
            fetchPlugin(input)
            ],
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window'
            }
        })

        setCode(result.outputFiles[0].text);


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



ReactDom.render(
    <App />,
    document.getElementById('root')
)