import { create } from 'zustand'
import { Column } from './dnd_types'

const initialData = {
    tasks: {
        'task-1': { id: 'task-1', content: 'Take out garbage' },
        'task-2': { id: 'task-2', content: 'Pet the cat' },
        'task-3': { id: 'task-3', content: 'Dance on the kitchen floor' },
        'task-4': { id: 'task-4', content: 'Cook dinner' }
    },

    columns: [
        {
            id: 'column-1',
            title: 'To do'
        },
        {
            id: 'column-2',
            title: 'To do 2'
        }
    ]
}

const useStore = create((set) => ({
    tasks: initialData.tasks,
    columns: initialData.columns,
    addColumn: (column: Column) => {
        set((state) => ({
            columns: [...state['columns'], column]
        }))
    },
}))

export default useStore
