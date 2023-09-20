'use client'

import Board from '@/components/board';
import Card from '@/components/card';
import Column from '@/components/column';
import { useState } from 'react';
import useStore from '../utils/store';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default function Home() {

  const [value, setValue] = useState('')
  const tasks = useStore((state) => state.tasks)
  const columns = useStore((state) => state.columns)
  const columnOrder = useStore((state) => state.columnOrder)

  const addAction = useStore((state) => state.addTask)

  const addTask = () => {
    addAction('tasks', value)
    setValue('')
  }

  return (
    <main className="flex flex-col items-center justify-center w-full">
      <div className="flex items-center justify-center gap-x-10">
        <input className="mt-1 px-3 py-2 bg-white border shadow-sm border-grey-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Task" type="text" value={value}
          onChange={ev => {
            setValue(ev.target.value)
          }}
        />
        <button onClick={() => addTask()}>Add</button>
      </div>
      <Board>
      </Board>
    </main>
  )
}
