import { useDrag } from '../../node_modules/react-dnd/dist/index'
import { ItemTypes } from '@/utils/dnd_types'
import useStore from '../utils/store';

const Card = ({ task, actual }) => {

    const moveTask = useStore((state) => state.moveTask)
    const removeTask = useStore((state) => state.removeTask)

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: {
            task: task,
            actual: actual
        },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult<string>()
            if (item && dropResult) {
                moveTask(item.actual, dropResult.id, item.task)
                item.actual = dropResult.id
            }
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    return (

        <div
            className={`flex justify-between items-center w-full ${isDragging ? 'opacity-50' : ''}`}
            ref={drag}
        >
            <p>{task}</p>
            <button className="bg-primary p-2 rounded text-white" onClick={() => removeTask(task)}>borrar</button>
        </div >
    )
}

export default Card
