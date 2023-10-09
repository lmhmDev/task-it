'use client'

import Board from '@/components/board';
import Modal from '@/components/modal';
import { useEffect, useState } from 'react';
import { Task } from '../utils/dnd_types';

export default function Home() {

    const [showModal, setShowModal] = useState(true)
    const [modalTask, setModalTask] = useState<Task | null>(null)

    const activeModal = (task: Task) => {
        setModalTask(task)
        setShowModal(true)
    }

    const deactivateModal = () => {
        setShowModal(false)
        setModalTask(null)
    }

    return (
        <main className="flex items-center h-[calc(100vh-74px)] w-full">
            {showModal && modalTask && <Modal task={modalTask} deactivate={deactivateModal} />}
            <Board activeModal={activeModal} />
        </main>
    )
}
