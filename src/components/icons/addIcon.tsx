import { colors } from "@/utils/constants";

interface Props {
    secondary: boolean
    isHovered: boolean
}

function AddIcon({ secondary, isHovered }: Props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className={`w-[20px]`}>
            <g fill={`${isHovered ? '#fff' : secondary ? colors.secondary : '#fff'}`}>
                <path d="M12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"></path>
                <path
                    fillRule="evenodd"
                    d="M12 1.25C6.063 1.25 1.25 6.063 1.25 12S6.063 22.75 12 22.75 22.75 17.937 22.75 12 17.937 1.25 12 1.25zM2.75 12a9.25 9.25 0 1118.5 0 9.25 9.25 0 01-18.5 0z"
                    clipRule="evenodd"
                ></path>
            </g>
        </svg>
    );
}

export default AddIcon
