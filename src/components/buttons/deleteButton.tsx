import React, { ReactElement } from 'react'

interface Props {
    action: () => void
}

function DeleteButton({ action }: Props): ReactElement {
    return (
        <button
            className="border rounded-sm p-1"
            onClick={(e) => {
                e.stopPropagation();
                action()
            }
            }
        >
            Delete
        </button>
    )
}

export default DeleteButton
