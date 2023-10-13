import React, { ReactElement } from 'react'
import RemoveIcon from '../icons/removeIcon';

interface Props {
    action: () => void
    secondary: boolean
}

function DeleteButton({ action, secondary }: Props): ReactElement {
    return (
        <button
            className="hover:bg-secondary rounded-sm p-2"
            onClick={(e) => {
                e.stopPropagation();
                action()
            }
            }
        >
            <RemoveIcon secondary={secondary} />
        </button>
    )
}

export default DeleteButton
