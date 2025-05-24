
export default function Footer() {
    return (
        <footer className="bg-background border-t-stone-500 shadow-md dark:bg-slate-900 h-32">
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div className="container flex flex-col items-center justify-between p-6 mx-auto sm:space-y-0 sm:flex-row">
                <p className="text-sm text-gray-600 dark:text-gray-300 text-right">
                    <span className="text-2x hand-written-light">Clemens Huck</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-right">© Copyright {new Date().getFullYear()}. All Rights Reserved.</p>
            </div>
        </footer>
    );
}


