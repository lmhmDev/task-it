'use client'

import { Column, Task } from '@/utils/dnd_types';
import { DndContext, closestCenter, DragStartEvent, DragEndEvent, DragOverlay, useSensors, useSensor, PointerSensor, DragOverEvent } from '@dnd-kit/core';
import useStore from '../utils/store';
import ColumnContainer from './column';
import { SortableContext } from '@dnd-kit/sortable';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import Card from './card';
import AddIcon from './icons/addIcon';

interface Props {
    activeModal: (task: Task) => void
}


const Board = ({ activeModal }: Props) => {
    const columns: Column[] = useStore((state) => state.columns)
    const tasks: Task[] = useStore((state) => state.tasks)
    const addColumn = useStore((state) => state.addColumn)
    const changeOrder = useStore((state) => state.changeOrder)
    const changeTasksOrder = useStore((state) => state.changeTasksOrder)

    const columnsIds = useMemo(() => columns.map((col) => col.id), [columns])

    const [activeColumn, setActiveColumn] = useState<Column | null>(null)
    const [activeTask, setActiveTask] = useState<Task | null>(null)

    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 3
        }
    }))

    const onDragStart = (event: DragStartEvent) => {
        console.log('Drag start', event)
        if (event.active.data.current?.type == "Column") {
            setActiveColumn(event.active.data.current.column)
        }

        if (event.active.data.current?.type == "Task") {
            setActiveTask(event.active.data.current.task)
        }
    }

    const onDragEnd = (event: DragEndEvent) => {
        setActiveColumn(null)
        setActiveTask(null)
        const { active, over } = event

        if (!over) return

        const activeColumn = active.id
        const overColumn = over.id

        if (activeColumn === overColumn) return

        const oldIndex = columns.findIndex((col) => col.id == activeColumn);
        const newIndex = columns.findIndex((col) => col.id == overColumn);

        changeOrder(oldIndex, newIndex)
    }

    const onDragOver = (event: DragOverEvent) => {
        const { active, over } = event

        if (!over) return

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return

        const isActiveATask = active.data.current?.type === 'Task'
        const isOverATask = over.data.current?.type === 'Task'

        if (!isActiveATask) return



        //Task dragged over Task

        if (isActiveATask && isOverATask) {

            const activeIndex = tasks.findIndex((task) => task.id == activeId);
            const overIndex = tasks.findIndex((task) => task.id == overId);

            changeTasksOrder(activeIndex, overIndex)

            tasks[activeIndex].columnId = tasks[overIndex].columnId

        }

        // Task dragged over Column

        const isOverAColumn = over.data.current?.type === 'Column'

        if (isActiveATask && isOverAColumn) {
            const activeIndex = tasks.findIndex((task) => task.id == activeId);

            tasks[activeIndex].columnId = overId

            changeTasksOrder(activeIndex, activeIndex)
        }
    }

    useEffect(() => {
        useStore.persist.rehydrate()
    }, [])

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
            <div className="flex gap-5 px-5 items-center overflow-x-auto h-[100%]">
                <SortableContext items={columnsIds}>
                    {columns.map((column) => {
                        const colTasks = tasks.filter(task => task.columnId === column.id)
                        return <ColumnContainer key={column.id} column={column} tasks={colTasks} activeModal={activeModal} />

                    })}
                </SortableContext>
                <button className="flex items-center justify-center gap-1 p-3 border border-white text-white rounded hover:bg-secondary" onClick={addColumn}><AddIcon />New column</button>
            </div>
            {typeof window !== 'undefined' && createPortal(
                <DragOverlay>
                    {activeColumn && <ColumnContainer column={activeColumn} tasks={tasks.filter(task => task.columnId === activeColumn.id)} activeModal={activeModal} />}
                    {activeTask && <Card task={activeTask} activeModal={activeModal} />}
                </DragOverlay>
                , document.body)}
        </DndContext>
    )
}

export default Board
