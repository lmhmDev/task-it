'use client'

import Board from '@/components/board';
import Card from '@/components/card';
import Column from '@/components/column';
import { useState } from 'react';
import useStore from '../utils/store';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default function Home() {

  return (
    <main className="flex items-center h-[calc(100vh-74px)] w-full">
      <Board />
    </main>
  )
}
