import { create } from 'zustand'
import { Column, Id } from './dnd_types';
import { Column } from '@/utils/dnd_types';
import { arrayMove } from '@dnd-kit/sortable';

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
    deleteColumn: (columnId: Id) => {
        set((state) => ({
            columns: state.columns.filter((column: Column) => column.id != columnId)
        }))
    },
    changeOrder: (oldIndex: number, newIndex: number) => {
        set((state) => ({
            columns: arrayMove(state.columns, oldIndex, newIndex)
        }))
    }
}))

export default useStore
