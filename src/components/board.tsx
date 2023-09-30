import AddIcon from '@/icons/AddIcon';
import { Column } from '@/utils/dnd_types';
import { DndContext, closestCenter } from '@dnd-kit/core';
import useStore from '../utils/store';
import ColumnContainer from './column';


const Board = () => {

    const tasks = useStore((state) => state.tasks)
    const columns: Column[] = useStore((state) => state.columns)
    const addColumn = useStore((state) => state.addColumn)

    const add = () => {
        const newCol = {
            id: 556,
            title: 'buenaas'
        }

        addColumn(newCol)
    }

    const onDragEnd = (event) => {
        const { active, over } = event
        console.log('active', active)
        console.log('over', over)
    }

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <div className="flex gap-5 px-5 items-center overflow-x-auto overflow-y-hidden">
                {columns.map((column) => {

                    return <ColumnContainer key={column.id} column={column} />

                })}
                <button className="flex p-3 rounded hover:bg-detail" onClick={add}><AddIcon /> añadir</button>
            </div>
        </DndContext>
    )
}

export default Board
