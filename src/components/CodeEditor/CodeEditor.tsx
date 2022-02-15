import React, { useRef } from 'react';

import './CodeEditor.css'

import MonacoEditor, { EditorDidMount } from '@monaco-editor/react'
import prettier from 'prettier'
//for the es6 syntax code
import parser from 'prettier/parser-babel'

interface CodeEditorProps {
    initialvalue: string
    onChange(value: string): void
}




const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialvalue }) => {

    const editorRef = useRef<any>()

    const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
        editorRef.current = monacoEditor;
        monacoEditor.onDidChangeModelContent(() => {
            onChange(getValue());
            // console.log(getValue());
        });

        // To reduce the tab space in the code editor.
        monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
    };

    const onFormatClick = () => {
        //get current code from the editor
        const unFormattedCode = editorRef.current.getModel().getValue();


        //format the code
        const formattedCode = prettier.format(unFormattedCode, {
            parser: 'babel',
            plugins: [parser],
            useTabs: false,
            semi: true,
            singleQuote: true
        }).replace(/\n$/, '');

        //set the formatted code back in the editor
        editorRef.current.setValue(formattedCode);
    }

    return (
        <div className='editor-wrapper'>
            <button className='button button-format is-primary is-small' onClick={onFormatClick}>Format</button>
            <MonacoEditor
                value={initialvalue}
                editorDidMount={onEditorDidMount}
                theme='dark'
                language='javascript'
                height="100%"
                options={{
                    wordWrap: 'on',
                    minimap: { enabled: false },
                    showUnused: false,
                    folding: false,
                    lineNumbersMinChars: 3,
                    fontSize: 16,
                    scrollBeyondLastLine: false,
                    automaticLayout: true
                }}
            />
        </div>
    )
};

export default CodeEditor;
