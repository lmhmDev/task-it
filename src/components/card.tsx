import useStore from '../utils/store';
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Task } from '@/utils/dnd_types';
import { useState } from 'react';
import { setegid } from 'process';
import DeleteButton from './buttons/deleteButton';

interface Props {
    task: Task
    activeModal: (task: Task) => void
}

const Card = ({ task, activeModal }: Props) => {

    const [isHovered, setIsHovered] = useState(false)

    const deleteTask = useStore((state) => state.deleteTask)

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: task.id,
        data: {
            type: 'Task',
            task
        }
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    if (isDragging) {
        return <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`w-full flex items-center h-[50px] justify-between border border-grey p-2 mb-2 opacity-30`}
        />
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={() => activeModal(task)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`w-full flex items-center justify-between border border-grey h-[50px] mb-2 hover:ring-2 hover:ring-inset hover:ring-primary`}>
            <p className="p-2">{task.subTasks?.length && task.subTasks.length}{task.title} </p>
            {
                isHovered &&
                <DeleteButton action={() => deleteTask(task.id)} />
            }
        </div >
    )
}

export default Card
