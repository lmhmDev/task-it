export type Id = string | number

export type Column = {
    id: Id
    title: string
}

export type Task = {
    id: Id
    columnId: Id
    title: string
    content: string
    subTasks: subTask[]
}

export type subTask = {
    id: Id
    content: string
    done: boolean
}
