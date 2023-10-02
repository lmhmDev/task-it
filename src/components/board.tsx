'use client'

import AddIcon from '@/icons/AddIcon';
import { Column } from '@/utils/dnd_types';
import { DndContext, closestCenter, DragStartEvent, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import useStore from '../utils/store';
import ColumnContainer from './column';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';


const Board = () => {

    const tasks = useStore((state) => state.tasks)
    const columns: Column[] = useStore((state) => state.columns)
    const addColumn = useStore((state) => state.addColumn)
    const changeOrder = useStore((state) => state.changeOrder)

    const columnsIds = useMemo(() => columns.map((col) => col.id), [columns])

    const [activeColumn, setActiveColumn] = useState<Column | null>()

    const add = () => {
        const newCol = {
            id: 556,
            title: 'buenaas'
        }

        addColumn(newCol)
    }

    const onDragStart = (event: DragStartEvent) => {
        console.log('Drag start', event)
        if (event.active.data.current?.type == "Column") {
            setActiveColumn(event.active.data.current.column)
        }
    }

    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (!over) return

        const activeColumn = active.id
        const overColumn = over.id

        if (activeColumn === overColumn) return

        const oldIndex = columns.findIndex((col) => col.id == activeColumn);
        const newIndex = columns.findIndex((col) => col.id == overColumn);

        changeOrder(oldIndex, newIndex)

    }

    return (
        <DndContext collisionDetection={closestCenter} onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <div className="flex gap-5 px-5 items-center overflow-x-auto overflow-y-hidden">
                <SortableContext items={columnsIds}>
                    {columns.map((column) => {

                        return <ColumnContainer key={column.id} column={column} />

                    })}
                </SortableContext>
                <button className="flex p-3 rounded hover:bg-detail" onClick={add}><AddIcon /> añadir</button>
            </div>
            {typeof window !== 'undefined' && createPortal(
                <DragOverlay>
                    {activeColumn && <ColumnContainer column={activeColumn} />}
                </DragOverlay>
                , document.body)}
        </DndContext>
    )
}

export default Board
