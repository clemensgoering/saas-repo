"use client"
import Image from 'next/image'
import { motion } from "framer-motion"

interface HeroConfig {
    main_title: string;
    main_description: string;
}

const HeroWhite = ({ animate, props }: { animate?: boolean, props: HeroConfig }) => {
    const Wrapper = animate ? motion.section : "div"
    return (
        <div className="relative isolate overflow-hidden bg-background dark:bg-slate-900 h-screen">
            <svg className="absolute inset-0 -z-10 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200 dark:hidden" aria-hidden="true">
                <defs>
                    <pattern id="0787a7c5-978c-4f66-83c7-11c213f99cb7" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                        <path d="M.5 200V.5H200" fill="none" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" strokeWidth="0" fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)" />
            </svg>
            <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:shrink-0 lg:pt-8">
                    <Image className="h-11" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" width={200} height={300} alt="Your Company" />
                    <div className="mt-24 sm:mt-32 lg:mt-16">
                        <a href="#" className="inline-flex space-x-6">
                            <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm/6 font-semibold text-indigo-600 ring-1 ring-indigo-600/10 ring-inset">What's new</span>
                            <span className="inline-flex items-center space-x-2 text-sm/6 font-medium text-gray-600">
                                <span>Just shipped v1.0</span>
                                <svg className="size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                    <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </a>
                    </div>
                    <h1 className="mt-10 text-5xl font-semibold tracking-tight text-pretty text-foreground sm:text-7xl">{props.main_title}</h1>
                    <p className="mt-8 text-lg font-medium text-pretty text-foreground sm:text-xl/8">{props.main_description}</p>
                    <div className="mt-10 flex items-center gap-x-6">
                        <a href="#" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</a>
                        <a href="#" className="text-sm/6 font-semibold text-gray-900">Learn more <span aria-hidden="true">→</span></a>
                    </div>
                </div>
                <Wrapper
                    {...(animate && {
                        initial: { opacity: 0, y: 24 },
                        whileInView: { opacity: 1, y: 0 },
                        transition: { duration: 2, ease: "easeOut" },
                        viewport: { once: true },
                    })}
                    className="py-20 px-6 bg-muted text-foreground"
                >
                    <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:mt-0 lg:mr-0 lg:ml-10 lg:max-w-none lg:flex-none xl:ml-32">
                        <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-gray-900/10 ring-inset lg:-m-4 lg:rounded-2xl lg:p-4">

                                <Image src="https://tailwindcss.com/plus-assets/img/component-images/project-app-screenshot.png"
                                    alt="App screenshot" width={1200} height={1442} className="w-304 rounded-md shadow-2xl ring-1 ring-gray-900/10" />

                            </div>
                        </div>
                    </div>
                </Wrapper>
            </div>
        </div>
    );
};

export {
    HeroWhite
}