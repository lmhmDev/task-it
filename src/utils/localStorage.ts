import { state } from "./dnd_types"

export const getData = () => {
    const data = localStorage.getItem('data')
    return data
}

export const setData = (data: state) => {
    const newData = JSON.stringify(data)
    localStorage.set('data', newData)
}
