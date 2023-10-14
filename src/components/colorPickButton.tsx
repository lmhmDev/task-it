interface Props {
    action: (color: string) => void
    color: string
    taskColor?: string
}

function ColorPickButton({ action, color, taskColor }: Props) {

    const style = {
        backgroundColor: color
    }

    return (
        <button
            style={style}
            className={`w-[30px] h-[30px] rounded-2xl border border-[2px] ${color == taskColor ? 'border-primary' : ''} hover:border-primary`}
            onClick={
                () => action(color)
            }
        />
    )
}

export default ColorPickButton
