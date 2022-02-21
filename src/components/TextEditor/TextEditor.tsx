import React, { useEffect, useState, useRef } from 'react'

import MDEditor from "@uiw/react-md-editor";

import './TextEditor.css'
import { Cell } from '../../state';
import { useActions } from '../../hooks/useActions';

interface TextEditorProps {
    cell: Cell
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {

    const ref = useRef<HTMLDivElement | null>(null);
    const [editingMode, setEditingMode] = useState(false)
    const { updateCell } = useActions()

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
                <MDEditor value={cell.content} onChange={(value) => updateCell(cell.id, value || '')} />
            </div>
        )
    }

    return (
        <div className='text-editor card' onClick={() => setEditingMode(true)}>
            <div className='card-content'>
                <MDEditor.Markdown source={cell.content || 'Click to edit'} />
            </div>
        </div>
    )
}

export default TextEditor;