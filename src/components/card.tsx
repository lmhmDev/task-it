import useStore from '../utils/store';
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Task } from '@/utils/dnd_types';
import { useState } from 'react';
import { setegid } from 'process';

interface Props {
    task: Task
}

const Card = ({ task }: Props) => {

    const [isHovered, setIsHovered] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const deleteTask = useStore((state) => state.deleteTask)
    const updateTask = useStore((state) => state.updateTask)

    return (
        <div
            onClick={() => setEditMode(true)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`w-full flex items-center justify-between border border-grey p-2 mb-2 hover:ring-2 hover:ring-inset hover:ring-primary`}>
            {
                editMode ?
                    <input
                        value={task.content}
                        autoFocus
                        onBlur={() => {
                            setEditMode(false)
                        }}
                        onKeyDown={(e) => {
                            if (e.key !== 'Enter') return
                            setEditMode(false)
                        }}
                        onChange={(e) => {
                            updateTask(task.id, e.target.value)
                        }}
                    /> :
                    <p className="p-2">{task.content}</p>}
            {
                isHovered &&
                <button
                    onClick={() => {
                        deleteTask(task.id)
                    }}
                    className="
                    opacity-60
                    p-2
                    rounded
                    hover:bg-detail
                    hover:opacity-100"
                >
                    Delete</button>
            }
        </div >
    )
}

export default Card
