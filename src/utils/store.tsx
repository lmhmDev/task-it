import { create } from 'zustand'

const initialData = {
    tasks: {
        'task-1': { id: 'task-1', content: 'Take out garbage' },
        'task-2': { id: 'task-2', content: 'Pet the cat' },
        'task-3': { id: 'task-3', content: 'Dance on the kitchen floor' },
        'task-4': { id: 'task-4', content: 'Cook dinner' }
    },

    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To do',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
        }
    },

    columnOrder: ['column-1']
}

const useStore = create((set) => ({
    tasks: initialData.tasks,
    columns: initialData.columns,
    columnOrder: initialData.columnOrder,
    addTask: (where, task) => {
        set((state) => ({
            [where]: [...state[where], task]
        }))
    },
    moveTask: (where, to, task) => {
        set((state) => ({
            [where]: state[where].filter((o) => o !== task),
            [to]: [...state[to], task]
        }))
    },
    removeTask: (o) => {
        set((state) => ({
            tasks: state.tasks.filter((task) => task !== o),
        }));
    },
}))

export default useStore
