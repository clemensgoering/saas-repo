import { cn } from "@lib/utils";

interface ButtonConfig {
    title: string;
    className: string;
}

const Button = ({ ...props }) => {
    return (
        <button {...props} className={cn(props.className, "block w-full rounded-md bg-indigo-200 " +
            "px-3.5 py-2.5 text-center text-sm font-semibold text-white " +
            "shadow-xs hover:bg-indigo-400 focus-visible:outline-2 " +
            "focus-visible:outline-offset-2 focus-visible:outline-indigo-400")}>
            {props.children}
        </button>
    );
};

const ButtonWhite = ({ ...props }) => {
    return (
        <button {...props}
            type="button"
            className={cn(props.className," rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50")}>
            {props.children}
        </button>
    );
};

export {
    Button,
    ButtonWhite
}

