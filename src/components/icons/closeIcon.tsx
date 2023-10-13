import { colors } from "@/utils/constants";

function CloseIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-[30px]">
            <g stroke={colors.primary} strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"></circle>
                <path strokeLinecap="round" d="M14.5 9.5l-5 5m0-5l5 5"></path>
            </g>
        </svg>
    );
}

export default CloseIcon
