import { useSortable } from '@dnd-kit/sortable';
import { Column } from '@/utils/dnd_types';
import useStore from '../utils/store';
import { CSS } from '@dnd-kit/utilities'

interface Props {
    column: Column
}

const ColumnContainer = ({ column }: Props) => {

    const deleteCol = useStore((state) => state.deleteColumn)

    const deleteColumn = () => {
        deleteCol(column.id)
    }

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: column.id,
        data: {
            type: 'Column',
            column
        }
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
                    <h3 className="text-2xl text-white">{column.title}</h3>
                </div>
                <button
                    className="
                p-2
                stroke-secondary
                hover:stroke-white
                hover:bg-secondary
                rounded
                z-3"
                    onClick={deleteColumn}
                >
                    Delete
                </button>
            </div>
            <div className="flex flex-grow">Content</div>
            <div>footer</div>
        </div>
    )
}

export default ColumnContainer
