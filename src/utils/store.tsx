import { create } from 'zustand'

const useStore = create((set) => ({
    tasks: [],
    column1: [],
    column2: [],
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
