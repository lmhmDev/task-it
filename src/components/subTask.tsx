import { subTask, Id } from '../utils/dnd_types';
import { useState } from 'react';

interface Props {
    subTask: subTask
    editSubTask: (id: Id, content: string) => void
    deleteSubTask: (id: Id) => void
}

const SubTask = ({ subTask, editSubTask, deleteSubTask }: Props) => {

    const [editMode, setEditMode] = useState(false)

    return <div onClick={() => setEditMode(true)} className="bg-white rounded p-2 flex justify-between items-center">
        {
            editMode ?
                <input
                    value={subTask.content}
                    autoFocus
                    onChange={(e) => {
                        editSubTask(subTask.id, e.target.value)
                    }}
                    onBlur={() => {
                        setEditMode(false)
                    }}
                    onKeyDown={(e) => {
                        if (e.key !== 'Enter') return
                        setEditMode(false)
                    }}
                /> :
                <p>{subTask.content}</p>}
        <button
            className="border rounded-sm p-1"
            onClick={() =>
                deleteSubTask(subTask.id)
            }
        >Delete</button>
    </div>
}

export default SubTask
