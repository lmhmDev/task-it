import { useEffect } from 'react';
import Card from './card';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

const Column = ({ column, tasks }) => {

    useEffect(() => {
        console.log(tasks)
    }, [tasks])

    return (
        <div className="border border-grey m-3">
            <h3 className="text-2xl p-3">{column.title}</h3>
            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                {
                    tasks.map((task) => {
                        return <Card key={task.id} task={task} />
                    })
                }
                {/* {provided => {
                    <div className="p-3"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {tasks.map(task => <Card key={task.id} task={task} />)}
                        {provided.placeholder}
                    </div>
                }
                } */}
            </SortableContext>
        </div>
    )
}

export default Column
