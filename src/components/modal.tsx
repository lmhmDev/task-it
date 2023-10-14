import { Task, Id, SubTask } from '../utils/dnd_types';
import { useState } from 'react';
import useStore from '../utils/store';
import SubTaskCard from './subTask';
import { generateId } from '@/utils/utils';
import AddIcon from './icons/addIcon';
import CloseIcon from './icons/closeIcon';
import { tasksColors } from '../utils/constants';
import ColorPickButton from './colorPickButton';
interface Props {
    task: Task
    deactivate: () => void
}

function Modal({ task, deactivate }: Props) {

    const [localTask, setLocalTask] = useState<Task>(task)

    const updateTask = useStore((state) => state.updateTask)

    const [isAddSubtaskHovered, setIsAddSubtaskHovered] = useState(false)

    const saveTask = () => {
        updateTask(localTask.id, localTask)
        deactivate()
    }

    const editSubTask = (id: Id, newSubTask: SubTask) => {
        const newSubTasks = localTask.subTasks.map(subTask => {
            if (subTask.id !== id) return subTask
            return newSubTask
        })
        setLocalTask(prevState => {
            return { ...prevState, subTasks: newSubTasks }
        })
    }

    const deleteSubTask = (subTaskId: Id) => {
        const newSubTasks = localTask.subTasks.filter(subTask => {
            if (subTask.id !== subTaskId) return subTask
        })
        setLocalTask(prevState => {
            return { ...prevState, subTasks: newSubTasks }
        })
    }

    const createSubTask = () => {
        const newSubTasks = localTask.subTasks.push({
            id: generateId(),
            content: 'New Sub Task',
            done: false
        })
        setLocalTask(prevState => {
            return { ...prevState, newSubTasks }
        })
    }

    const editColor = (color: string) => {
        setLocalTask(prevState => {
            return { ...prevState, color: color }
        })
    }

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-white rounded min-w-[300px] w-1/4 min-h-[66%] flex flex-col p-3">
                <div className="w-full flex justify-end">
                    <button
                        className="mb-2 p-1 w-fit hover:bg-detail rounded"
                        onClick={deactivate}
                    >
                        <CloseIcon />
                    </button>
                </div>
                <div className="flex flex-col gap-2 grow">
                    <div className="shadow p-3 rounded">
                        <p>Task title:</p>
                        <input
                            className="p-1 rounded w-full border-[1px] focus:border-primary outline-none"
                            value={localTask.title}
                            onChange={(e) => {
                                setLocalTask(prevState => {
                                    return { ...prevState, title: e.target.value }
                                })
                            }} />
                    </div>
                    <div className="shadow p-3 rounded">
                        <p>Description:</p>
                        <textarea
                            className="p-1 rounded w-full max-h-[80px] border-[1px] focus:border-primary outline-none"
                            value={localTask.content}
                            onChange={(e) => {
                                setLocalTask(prevState => {
                                    return { ...prevState, content: e.target.value }
                                })
                            }} />
                    </div>
                    <div className="p-3 pl-0 flex items-center justify-center gap-1 rounded">
                        <p>Pick color:</p>
                        <div className="flex flex-grow">
                            <ColorPickButton action={editColor} color={''} taskColor={localTask.color} />
                            {Object.values(tasksColors).map((color) => {
                                return <ColorPickButton key={color} action={editColor} color={color} taskColor={localTask.color} />
                            })}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <p>Subtasks:</p>
                        {
                            !!localTask.subTasks?.length &&
                            localTask.subTasks.map(subTask => {
                                return <SubTaskCard key={subTask.id} subTask={subTask} editSubTask={editSubTask} deleteSubTask={deleteSubTask} />
                            })


                        }
                        {
                            localTask.subTasks.length < 4 &&
                            <button
                                onMouseOver={() => setIsAddSubtaskHovered(true)}
                                onMouseLeave={() => { setIsAddSubtaskHovered(false) }}
                                className="flex items-center justify-center gap-1 p-1 rounded border border-secondary text-secondary mt-2 w-fit m-auto hover:bg-primary hover:border-primary hover:text-white"
                                onClick={createSubTask}
                            ><AddIcon isHovered={isAddSubtaskHovered} secondary /> Add</button>
                        }
                    </div>
                </div>
                <footer className="flex justify-end p-2">
                    <button
                        onClick={saveTask}
                        className="border rounded border-white text-white bg-primary px-4 py-3 hover:bg-secondary">Save</button>
                </footer>
            </div>
        </div>
    )
}

export default Modal
