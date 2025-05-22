"use client"

import Image from 'next/image'
import { motion } from "framer-motion"

interface ContentConfig {
    main_title: string;
    main_description: string;
}

const ContentImage = ({ animate, props }: { animate?: boolean, props: ContentConfig }) => {
    const Wrapper = animate ? motion.section : "section"
    return (
        <Wrapper
            {...(animate && {
                initial: { opacity: 0, y: 24 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 1.5, ease: "easeOut" },
                viewport: { once: true },
            })}
            className="py-20 px-6 bg-muted text-foreground"
        >
            <div className="">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl sm:text-center">
                        <h2 className="text-base/7 font-semibold text-indigo-600">Everything you need</h2>
                        <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty light:text-gray-900 sm:text-5xl sm:text-balance">
                            No server? No problem.
                        </p>
                        <p className="mt-6 text-lg/8 light:text-gray-600">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste
                            dolor cupiditate blanditiis.
                        </p>
                    </div>
                </div>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="relative mt-16 aspect-2432/1442 h-144 sm:h-auto sm:w-[calc(var(--container-7xl)-calc(var(--spacing)*16))]">
          <div className="absolute -inset-2 rounded-[calc(var(--radius-xl)+calc(var(--spacing)*2))] shadow-xs ring-1 ring-black/5" />
          <img
            alt=""
            src="https://tailwindcss.com/plus-assets/img/component-images/project-app-screenshot.png"
            className="h-full rounded-xl shadow-2xl ring-1 ring-black/10"
          />
        </div>
      </div>
            </div>
        </Wrapper>
    );
};

const ContentWhite = ({ animate, props }: { animate?: boolean, props: ContentConfig }) => {
    const Wrapper = animate ? motion.section : "section"
    return (
        <Wrapper
            {...(animate && {
                initial: { opacity: 0, y: 24 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 1.5, ease: "easeOut" },
                viewport: { once: true },
            })}
            className="py-20 px-6 bg-muted text-foreground"
        >
            <div className="bg-background dark:bg-slate-900 py-48">
                <div className="mx-auto max-w-7xl px-6 lg:max-w-7xl lg:px-8 py-12">
                    <div className="max-w-7xl">
                        <p className="text-base/7 font-semibold text-indigo-600">About us</p>
                        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty light:text-gray-900 sm:text-5xl">On a mission to empower remote teams</h1>
                        <p className="mt-6 text-xl text-balance light:text-gray-700">Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae feugiat egestas.</p>
                    </div>
                    <section className="mt-20 grid grid-cols-1 lg:gap-x-8 lg:gap-y-16">
                        <div className="lg:pr-8">
                            <h2 className="text-2xl font-semibold tracking-tight text-pretty light:text-gray-900">Our mission</h2>
                            <p className="mt-6 text-base/7 light:text-gray-600">Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id.</p>
                            <p className="mt-8 text-base/7 light:text-gray-600">Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit molestie auctor fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius vulputate et ultrices hac adipiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem vel integer orci.</p>
                        </div>
                    </section>
                </div>
            </div>
        </Wrapper>
    );
};



export {
    ContentWhite,
    ContentImage
}