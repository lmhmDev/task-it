import useStore from '../utils/store';
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const Card = ({ task }) => {

    const moveTask = useStore((state) => state.moveTask)
    const removeTask = useStore((state) => state.removeTask)

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({
        id: task.id
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <div
            style={style}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className={`w-full border border-grey p-3 mb-2`}
        >
            { task.content}
        </div >
    )
}

export default Card
