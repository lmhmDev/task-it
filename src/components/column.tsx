import { useEffect } from 'react';
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../utils/dnd_types';
import Card from './card';

const Column = ({ name, id, tasks }) => {

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.CARD,
        drop: () => ({ id: id }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))

    const isActive = canDrop && isOver

    useEffect(() => {
        console.log(tasks)
    }, [tasks])

    return (
        <div ref={drop} className={`h-96 w-96 bg-secondary ${canDrop ? 'border-2 border-detail' : ''} ${isActive ? 'border-primary' : ''}`}>
            {name}
            <div className>
                {tasks.map(task => {
                    return <Card task={task} actual={id} />
                })}
            </div>
        </div>
    )
}

export default Column
