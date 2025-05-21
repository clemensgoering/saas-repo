import Image from 'next/image'

interface ContentConfig {
    main_title: string;
    main_description: string;
}

const ContentWhite = ({ config }: { config: ContentConfig }) => {

    return (
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

    );
};

export {
    ContentWhite
}