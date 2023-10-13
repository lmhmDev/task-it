import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { Column, Id, Task } from './dnd_types';
import { arrayMove } from '@dnd-kit/sortable';
import { generateId } from './utils';

interface StoreState {
    tasks: Task[]
    columns: Column[]
    addColumn: () => void
    deleteColumn: (columnId: Id) => void
    changeOrder: (oldIndex: number, newIndex: number) => void
    updateColumnTitle: (id: Id, title: string) => void
    createTask: (columnId: Id) => void
    deleteTask: (taskId: Id) => void
    updateTask: (taskId: Id, updatedTask: Task) => void
    changeTasksOrder: (oldIndex: number, newIndex: number) => void
}

const useStore = create<StoreState>()(
    persist(
        (set) => ({
            tasks: [],
            columns: [],

            addColumn: () => {
                const newColumn = {
                    id: generateId(),
                    title: 'New column'
                }
                set((state) => ({
                    columns: [...state['columns'], newColumn]
                }))
            },

            deleteColumn: (columnId: Id) => {
                set((state) => ({
                    tasks: state.tasks.filter((task: Task) => task.columnId !== columnId),
                    columns: state.columns.filter((column: Column) => column.id !== columnId)
                }))
            },

            changeOrder: (oldIndex: number, newIndex: number) => {
                set((state) => {
                    return { columns: arrayMove(state.columns, oldIndex, newIndex) }
                })

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
                        content: '',
                        subTasks: []
                    }
                    return { tasks: [...state['tasks'], newTask] }
                })
            },

            deleteTask: (taskId: Id) => {
                set((state) => ({
                    tasks: state.tasks.filter((task: Task) => task.id !== taskId)
                }))
            },

            updateTask: (taskId: Id, updatedTask: Task) => {
                set((state) => {
                    const newTasks = state.tasks.map((task: Task) => {
                        if (task.id !== taskId) return task
                        return updatedTask
                    })

                    return { tasks: newTasks }
                })
            },

            changeTasksOrder: (oldIndex: number, newIndex: number) => {
                set((state) => ({
                    tasks: arrayMove(state.tasks, oldIndex, newIndex)
                }))
            }
        }),
        {
            name: 'data',
            storage: createJSONStorage(() => localStorage),
            skipHydration: true,
        }
    ))

export default useStore
