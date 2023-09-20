import { DndContext, closestCenter } from '@dnd-kit/core';
import useStore from '../utils/store';
import Column from './column';


const Board = () => {

    const tasks = useStore((state) => state.tasks)
    const columns = useStore((state) => state.columns)
    const columnOrder = useStore((state) => state.columnOrder)

    const onDragEnd = (event) => {
        const { active, over } = event
        console.log('active', active)
        console.log('over', over)
    }

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            { columnOrder.map((columnId) => {

                const column = columns[columnId]
                const columnTasks = column.taskIds.map(taskId => tasks[taskId])

                return <Column key={column.id} column={column} tasks={columnTasks} />

            })}
        </DndContext>
    )
}

export default Board
