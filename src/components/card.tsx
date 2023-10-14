import useStore from '../utils/store';
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Task } from '@/utils/dnd_types';
import { useState } from 'react';
import DeleteButton from './buttons/deleteButton';
import { tasksColors } from '@/utils/constants';

interface Props {
    task: Task
    activeModal: (task: Task) => void
}

const Card = ({ task, activeModal }: Props) => {

    const [isHovered, setIsHovered] = useState(false)

    const deleteTask = useStore((state) => state.deleteTask)

    const doneTasks = task.subTasks.filter(subtask => subtask.done === true)

    const colorStyle = {
        backgroundColor: task.color
    }

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
            className={`w-full flex items-center justify-between border border-grey relative h-[50px] mb-2 shadow rounded p-2 hover:ring-2 hover:ring-inset hover:ring-primary`}>
            <p className="border rounded-2xl p-1 w-[45px] text-center text-sm">
                {doneTasks.length} / {task.subTasks.length}
            </p>
            <div className="flex flex-grow items-center p-2 gap-1">
                {
                    !!task.color &&
                    <div
                        style={colorStyle}
                        className={`w-[20px] h-[10px] rounded`} />
                }
                <p className="">
                    {task.title}
                </p>
            </div>
            {
                isHovered &&
                <DeleteButton secondary action={() => deleteTask(task.id)} />
            }

        </div >
    )
}

export default Card
