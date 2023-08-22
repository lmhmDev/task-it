'use client'

import Board from '@/components/board';
import Card from '@/components/card';
import Column from '@/components/column';
import { useState } from 'react';
import useStore from '../utils/store';

export default function Home() {

  const [value, setValue] = useState('')
  const tasks = useStore((state) => state.tasks)
  const column1 = useStore((state) => state.column1)
  const column2 = useStore((state) => state.column2)

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
        <div className="mt-10 flex flex-col gap-8 items-center justify-center w-1/3">
          {tasks.map(task => {
            return <Card task={task} actual="tasks" />
          })}
        </div>
        <div className="flex gap-6">
          <Column name="Columna 1" id="column1" tasks={column1} />
          < Column name="Columna 2" id="column2" tasks={column2} />
        </div>
      </Board>
    </main>
  )
}
