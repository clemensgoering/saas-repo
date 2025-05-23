import Image from 'next/image'

interface FAQConfig {
    main_title: string;
    main_description: string;
}

const FAQ = ({ config }: { config?: FAQConfig }) => {

    return (
        <div className="bg-background">
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-4xl font-semibold tracking-tight light:text-gray-900 sm:text-5xl">Frequently asked questions</h2>
                    <dl className="mt-16 divide-y light:divide-gray-900/10">
                        <div className="py-6 first:pt-0 last:pb-0">
                            <dt>
                                <button type="button" className="flex w-full items-start justify-between text-left light:text-gray-900" aria-controls="faq-0" aria-expanded="false">
                                    <span className="text-base/7 font-semibold">What&#039;s the best thing about Switzerland?</span>
                                    <span className="ml-6 flex h-7 items-center">
                                        <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                                        </svg>
                                        <svg className="hidden size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                                        </svg>
                                    </span>
                                </button>
                            </dt>
                            <dd className="mt-2 pr-12" id="faq-0">
                                <p className="text-base/7 light:text-gray-600">I don&#039;t know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.</p>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export {
    FAQ
}





