import { create } from 'zustand'
import { Column, Id, Task } from './dnd_types';
import { Column } from '@/utils/dnd_types';
import { arrayMove } from '@dnd-kit/sortable';

const initialData = {
    tasks: [
        { id: 'task-1', columnId: 'column-1', content: 'Take out garbage' },
        { id: 'task-2', columnId: 'column-1', content: 'Pet the cat' },
        { id: 'task-3', columnId: 'column-1', content: 'Dance on the kitchen floor' },
        { id: 'task-4', columnId: 'column-1', content: 'Cook dinner' }
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
                content: 'New task'
            }
            return { tasks: [...state['tasks'], newTask] }
        })
    },

    deleteTask: (taskId: Id) => {
        set((state) => ({
            tasks: state.tasks.filter((task: Task) => task.id !== taskId)
        }))
    }
}))

export default useStore
