import { cn } from "@lib/utils";

interface ButtonConfig {
    title: string;
    className: string;
}

const Button = ({ config }: { config: ButtonConfig }) => {

    return (
        <button type="submit" className={ cn(config.className, "block w-full rounded-md bg-indigo-600 " + 
                "px-3.5 py-2.5 text-center text-sm font-semibold text-white " +
                "shadow-xs hover:bg-indigo-500 focus-visible:outline-2 " + 
                "focus-visible:outline-offset-2 focus-visible:outline-indigo-600")}>
                {config.title}
        </button>
    );
};

export {
    Button
}

