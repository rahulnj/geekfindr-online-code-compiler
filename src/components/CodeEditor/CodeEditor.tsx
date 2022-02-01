import React from 'react';

import MonacoEditor, { EditorDidMount } from '@monaco-editor/react'

interface CodeEditorProps {
    initialvalue: string
    onChange(value: string): void
}




const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialvalue }) => {

    const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
        monacoEditor.onDidChangeModelContent(() => {
            onChange(getValue());
            console.log(getValue());
        });

        // To reduce the tab space in the code editor.
        monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
    };


    return <MonacoEditor
        value={initialvalue}
        editorDidMount={onEditorDidMount}
        theme='dark'
        language='javascript'
        height="500px"
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
};

export default CodeEditor;
