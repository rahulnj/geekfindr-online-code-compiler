import * as esbuild from 'esbuild-wasm'
import { useEffect, useRef, useState } from 'react';
import ReactDom from 'react-dom';
import { fetchPlugin, unpkgPathPlugin } from './plugins';


const App = () => {
    const ref = useRef<any>();
    const iframe = useRef<any>();
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

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

        // setCode(result.outputFiles[0].text);
        iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');

    };

    const html = `
   <html>
   <head></head>
   <body>
   <div id="root"></div>
   <script>
   window.addEventListener('message',(e)=>{
      eval(e.data);
   },false);
   </script>
   </body>
   </html>
  `;

    return (
        <div>
            <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
            <div>
                <button onClick={submitHandler}>submit</button>
            </div>
            <pre>{code}</pre>
            <iframe ref={iframe} srcDoc={html} sandbox='allow-scripts'></iframe>
        </div>
    )

}



ReactDom.render(
    <App />,
    document.getElementById('root')
)