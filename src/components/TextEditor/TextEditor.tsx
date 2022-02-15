import React, { useEffect, useState, useRef } from 'react'

import MDEditor from "@uiw/react-md-editor";

import './TextEditor.css'

const TextEditor: React.FC = () => {

    const ref = useRef<HTMLDivElement | null>(null);
    const [editingMode, setEditingMode] = useState(false)
    const [value, setValue] = useState('# Header')

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (ref.current && event.target && ref.current.contains(event.target as Node)) {
                return;
            }
            setEditingMode(false)
        }
        document.addEventListener('click', listener, { capture: true })
        return () => {
            document.removeEventListener('click', listener, { capture: true })
        }
    }, [])

    if (editingMode) {
        return (
            <div className='text-editor' ref={ref}>
                <MDEditor value={value} onChange={(v) => setValue(v || '')} />
            </div>
        )
    }

    return (
        <div className='text-editor card' onClick={() => setEditingMode(true)}>
            <div className='card-content'>
                <MDEditor.Markdown source={value} />
            </div>
        </div>
    )
}

export default TextEditor;