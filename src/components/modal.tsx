import { Task, Id, SubTask } from '../utils/dnd_types';
import { useState } from 'react';
import useStore from '../utils/store';
import SubTaskCard from './subTask';
import { generateId } from '@/utils/utils';
interface Props {
    task: Task
    deactivate: () => void
}

function Modal({ task, deactivate }: Props) {

    const [localTask, setLocalTask] = useState<Task>(task)

    const updateTask = useStore((state) => state.updateTask)

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

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-secondary min-w-fit w-1/4 h-2/3 flex flex-col p-3">
                <div className="grow">
                    <p>Task title:
                    <input value={localTask.title} onChange={(e) => {
                            setLocalTask(prevState => {
                                return { ...prevState, title: e.target.value }
                            })
                        }} />
                    </p>
                    <p>Description:</p>
                    <textarea value={localTask.content} onChange={(e) => {
                        setLocalTask(prevState => {
                            return { ...prevState, content: e.target.value }
                        })
                    }} />
                    <div className="flex flex-col">
                        <p>Subtasks:</p>
                        {
                            !!localTask.subTasks?.length &&

                            localTask.subTasks.map(subTask => {
                                return <SubTaskCard key={subTask.id} subTask={subTask} editSubTask={editSubTask} deleteSubTask={deleteSubTask} />
                            })

                        }
                        {
                            localTask.subTasks && localTask.subTasks.length < 4 &&

                            <button
                                onClick={createSubTask}
                            >Add</button>
                        }
                    </div>
                </div>
                <footer className="flex justify-end p-2">
                    <button
                        onClick={saveTask}
                        className="border rounded border-white text-white bg-primary px-4 py-3 hover:ring-2 hover:ring-inset hover:ring-secondary">Save</button>
                </footer>
            </div>
        </div>
    )
}

export default Modal
