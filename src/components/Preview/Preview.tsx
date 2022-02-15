import React, { useEffect, useRef } from 'react';

import './Preview.css'

interface PreviewProps {
    code: string,
    err: string
}
const html = `
   <html>
   <head>
   <style>html {background-color:white;}</style>
   </head>
   <body>
   <div id="root"></div>
   <script>
   const handleError=(error)=>{
    const root=document.querySelector('#root');
    root.innerHTML='<div style="color:red;"><h4>Runtime Error</h4>' +error+ '</div>'
    console.error(error);     
   }
window.addEventListener('error',(event)=>{
    event.preventDefault();
    handleError(event.error);
})

   window.addEventListener('message',(e)=>{
       try{
           eval(e.data);
       }catch(error){
handleError(error)
}
   },false);
   </script>
   </body>
   </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
    const iframe = useRef<any>();
    useEffect(() => {
        iframe.current.srcdoc = html;
        setTimeout(() => {
            iframe.current.contentWindow.postMessage(code, '*');
        }, 50)
    }, [code])
    console.log(err);

    return (
        <div className='preview-wrapper'>
            <iframe title='preview'
                ref={iframe}
                srcDoc={html}
                sandbox='allow-scripts'
            />
            {err && <div className='preview-error'>{err}</div>}
        </div>
    );
};

export default Preview;
