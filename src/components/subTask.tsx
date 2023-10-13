import { Id, SubTask } from '../utils/dnd_types';
import { useState } from 'react';
import DeleteButton from './buttons/deleteButton';

interface Props {
    subTask: SubTask
    editSubTask: (id: Id, newSubTask: SubTask) => void
    deleteSubTask: (id: Id) => void
}

const SubTaskCard = ({ subTask, editSubTask, deleteSubTask }: Props) => {

    const [editMode, setEditMode] = useState(false)

    return <div onClick={() => setEditMode(true)} className="bg-white rounded p-2 flex justify-between items-center">
        {
            editMode ?
                <input
                    value={subTask.content}
                    autoFocus
                    onChange={(e) => {
                        editSubTask(subTask.id, { ...subTask, content: e.target.value })
                    }}
                    onBlur={() => {
                        setEditMode(false)
                    }}
                    onKeyDown={(e) => {
                        if (e.key !== 'Enter') return
                        setEditMode(false)
                    }}
                /> :
                <>
                    <button
                        className={`w-4 h-4 border rounded mr-2 ${subTask.done ? 'bg-primary' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation()
                            editSubTask(subTask.id, { ...subTask, done: !subTask.done })
                        }} />
                    <p className="flex-grow">{subTask.content}</p>
                </>
        }

        <DeleteButton secondary action={() => deleteSubTask(subTask.id)} />
    </div>
}

export default SubTaskCard
