import { Task } from '../utils/dnd_types';
import { useState } from 'react';
import useStore from '../utils/store';
interface Props {
    task: Task
    deactivate: () => void
}

function Modal({ task, deactivate }: Props) {

    const [localTask, setLocalTask] = useState<Task>(task)

    const updateTask = useStore((state) => state.updateTask)

    const saveTask = () => {
        updateTask(localTask.id, localTask.title, localTask.content)
        deactivate()
    }

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-secondary w-2/4 h-2/3 flex flex-col p-3">
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
