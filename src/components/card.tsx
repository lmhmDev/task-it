import useStore from '../utils/store';
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Task } from '@/utils/dnd_types';

interface Props {
    task: Task
}

const Card = ({ task }: Props) => {

    const deleteTask = useStore((state) => state.deleteTask)

    return (
        <div className={`w-full flex items-center justify-between border border-grey p-2 mb-2`}>
            { task.content}
            <button
                onClick={() => {
                    deleteTask(task.id)
                }}
                className="
                p-2
                rounded
            hover:bg-detail
            ">Delete</button>
        </div >
    )
}

export default Card
