import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { Column, Task } from '@/utils/dnd_types';
import useStore from '../utils/store';
import { CSS } from '@dnd-kit/utilities'
import { useMemo, useState } from 'react';
import Card from './card';

interface Props {
    column: Column
    tasks: Task[]
}

const ColumnContainer = ({ column, tasks }: Props) => {

    const [editMode, setEditMode] = useState(false)

    const deleteCol = useStore((state) => state.deleteColumn)
    const updateColumnTitle = useStore((state) => state.updateColumnTitle)
    const createTask = useStore((state) => state.createTask)

    const tasksIds = useMemo(() => {
        return tasks.map(task => task.id)
    }, [tasks])

    const deleteColumn = () => {
        deleteCol(column.id)
    }

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: column.id,
        data: {
            type: 'Column',
            column
        },
        disabled: editMode
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        opacity: isDragging ? 0.5 : 1
    }

    return (
        <div ref={setNodeRef} style={style} className="flex flex-col h-[500px] bg-secondary min-w-[350px] rounded">
            <div
                {...attributes}
                {...listeners}
                onClick={() => setEditMode(true)}
                className="
            bg-primary 
            border-secondary 
            border-4 
            h-[60px] 
            p-2 
            rounded-md 
            rounded-b-none
            cursor-grab 
            flex 
            justify-between
            items-center">
                <div>
                    {
                        editMode ?
                            <input
                                value={column.title}
                                onChange={(e) => {
                                    updateColumnTitle(column.id, e.target.value)
                                }}
                                autoFocus
                                onBlur={() => setEditMode(false)
                                }
                                onKeyDown={(e) => {
                                    if (e.key !== 'Enter') return
                                    setEditMode(false)
                                }}
                            /> :
                            <h3 className="text-2xl text-white">{column.title}</h3>
                    }
                </div>
                <button
                    className="
                p-2
                stroke-secondary
                hover:stroke-white
                hover:bg-secondary
                rounded
                z-3"
                    onClick={() => deleteColumn()}
                >
                    Delete
                </button>
            </div>
            <div className="flex flex-col flex-grow px-1">
                <SortableContext items={tasksIds}>
                    {
                        tasks?.map(task => {
                            return <Card key={task.id} task={task} />
                        })
                    }
                </SortableContext>
            </div>
            <div>
                <button
                    onClick={() => {
                        createTask(column.id)
                    }}
                >Add Task</button>
            </div>
        </div >
    )
}

export default ColumnContainer
