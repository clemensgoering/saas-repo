import Image from 'next/image'
import { FeatureItem } from "@data/features"

const FeatureImage = ({ features }: { features: FeatureItem[] }) => {

    return (
        <div className="overflow-hidden bg-background dark:bg-slate-900 py-48">
            <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
                    <div className="px-6 md:px-0 lg:pt-4 lg:pr-4">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                            <h2 className="text-base/7 font-semibold light:text-indigo-600">Deploy faster</h2>
                            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty light:text-gray-900 sm:text-5xl">A better workflow</p>
                            <p className="mt-6 text-lg/8 light:text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.</p>
                        </div>
                    </div>
                    <div className="sm:px-6 lg:px-0">
                        <div className="relative isolate overflow-hidden bg-indigo-500 px-6 pt-8 sm:mx-auto sm:max-w-2xl sm:rounded-3xl sm:pt-16 sm:pr-0 sm:pl-16 lg:mx-0 lg:max-w-none">
                            <div className="absolute -inset-y-px -left-3 -z-10 w-full origin-bottom-left skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-white ring-inset" aria-hidden="true"></div>
                            <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                                <div className="w-screen overflow-hidden rounded-tl-xl bg-gray-900 ring-1 ring-white/10">
                                    <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                                        <div className="-mb-px flex text-sm/6 font-medium light:text-gray-400">
                                            <div className="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">NotificationSetting.jsx</div>
                                            <div className="border-r border-gray-600/10 px-4 py-2">App.jsx</div>
                                        </div>
                                    </div>
                                    <div className="px-6 pt-6 pb-14">
                                    </div>
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-0 ring-1 ring-black/10 ring-inset sm:rounded-3xl" aria-hidden="true"></div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto max-w-7xl py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {features.map((feature, index) => (
                        <div className="relative lg:py-8" key={index}>
                            <dt className="inline font-semibold light:text-gray-900">
                                {feature.icon}
                                {feature.title}
                            </dt>
                            <dd className="inline">{feature.description}</dd>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export {
    FeatureImage
}


