interface Props {
    secondary: boolean
}

function RemoveIcon({ secondary }: Props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#fff"
            stroke="#fff"
            viewBox="0 0 24 24"
            className={`w-[20px] ${secondary ? 'fill-secondary' : ''}`}
        >
            <path d="M5.755 20.283L4 8h16l-1.755 12.283A2 2 0 0116.265 22h-8.53a2 2 0 01-1.98-1.717zM21 4h-5V3a1 1 0 00-1-1H9a1 1 0 00-1 1v1H3a1 1 0 000 2h18a1 1 0 000-2z"></path>
        </svg>
    );
}

export default RemoveIcon
