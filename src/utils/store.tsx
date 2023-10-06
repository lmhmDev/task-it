import { create } from 'zustand'
import { Column, Id, Task, subTask } from './dnd_types';
import { arrayMove } from '@dnd-kit/sortable';

const initialData = {
    tasks: [
        { id: 'task-1', columnId: 'column-1', title: 'Take out garbage', content: 'I have to take out the garbage or mom kills me', subTasks: [{ id: '2323', content: 'buenaas', done: false }, { id: '2323', content: 'buenaas', done: false }] },
        { id: 'task-2', columnId: 'column-1', title: 'pet de cat', content: 'i should definetly Pet the cat' },
        { id: 'task-3', columnId: 'column-1', title: 'run', content: 'Go running!' },
        { id: 'task-4', columnId: 'column-1', title: 'Kiss garbage', content: 'Im joking, but you looked!' }
    ],

    columns: [
        {
            id: 'column-1',
            title: 'To do'
        }
    ]
}

const generateId = () => {
    return Math.random() * 10001
}

const useStore = create((set) => ({
    tasks: initialData.tasks,
    columns: initialData.columns,

    addColumn: (column: Column) => {
        set((state) => ({
            columns: [...state['columns'], column]
        }))
    },

    deleteColumn: (columnId: Id) => {
        set((state) => ({
            columns: state.columns.filter((column: Column) => column.id != columnId)
        }))
    },

    changeOrder: (oldIndex: number, newIndex: number) => {
        set((state) => ({
            columns: arrayMove(state.columns, oldIndex, newIndex)
        }))
    },

    updateColumnTitle: (id: Id, title: string) => {
        set((state) => {
            const newCols = state.columns.map((column: Column) => {
                if (column.id !== id) return column
                return { ...column, title }
            })
            return { columns: newCols }
        })
    },

    createTask: (columnId: Id) => {
        set((state) => {
            const newTask: Task = {
                id: generateId(),
                columnId: columnId,
                title: 'New Task',
                content: ''
            }
            return { tasks: [...state['tasks'], newTask] }
        })
    },

    deleteTask: (taskId: Id) => {
        set((state) => ({
            tasks: state.tasks.filter((task: Task) => task.id !== taskId)
        }))
    },

    updateTask: (taskId: Id, task: Task) => {
        set((state) => {
            const newTasks = state.tasks.map((task: Task) => {
                if (task.id !== taskId) return task
                return task
            })

            return { tasks: newTasks }
        })
    },

    changeTasksOrder: (oldIndex: number, newIndex: number) => {
        set((state) => ({
            tasks: arrayMove(state.tasks, oldIndex, newIndex)
        }))
    }
}))

export default useStore
