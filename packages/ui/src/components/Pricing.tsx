"use client"

import { cn } from '../lib/utils';
import { motion } from "framer-motion"
import { PlusIcon } from '@heroicons/react/16/solid'
import { PricingBlock } from "@data/pricing"
import Link from 'next/link';


interface PricingConfig {
    main_title: string;
    main_description: string;
    className: string;
}

const PricingSingle = ({ animate, props }: { animate?: boolean, props: PricingConfig }) => {
    const Wrapper = animate ? motion.section : "section"
    return (
        <Wrapper
            {...(animate && {
                initial: { opacity: 0, y: 24 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.6, ease: "easeIn" },
                viewport: { once: true },
            })}
            className="py-20 bg-muted text-foreground"
        >
            <div className={cn("py-24 sm:py-32", props.className)}>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl sm:text-center">
                        <h2 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-6xl sm:text-balance">Simple no-tricks pricing</h2>
                        <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas in. Explicabo id ut laborum.</p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                        <div className="p-8 sm:p-10 lg:flex-auto">
                            <h3 className="text-3xl font-semibold tracking-tight text-gray-900">Lifetime membership</h3>
                            <p className="mt-6 text-base/7 text-gray-600">Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis repellendus etur quidem assumenda.</p>
                            <div className="mt-10 flex items-center gap-x-4">
                                <h4 className="flex-none text-sm/6 font-semibold text-indigo-600">What’s included</h4>
                                <div className="h-px flex-auto bg-gray-100"></div>
                            </div>
                            <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm/6 text-gray-600 sm:grid-cols-2 sm:gap-6">
                                <li className="flex gap-x-3">
                                    <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                                    </svg>
                                    Private forum access
                                </li>
                                <li className="flex gap-x-3">
                                    <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                                    </svg>
                                    Member resources
                                </li>
                                <li className="flex gap-x-3">
                                    <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                                    </svg>
                                    Entry to annual conference
                                </li>
                                <li className="flex gap-x-3">
                                    <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                                    </svg>
                                    Official member t-shirt
                                </li>
                            </ul>
                        </div>
                        <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:shrink-0">
                            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-gray-900/5 ring-inset lg:flex lg:flex-col lg:justify-center lg:py-16">
                                <div className="mx-auto max-w-xs px-8">
                                    <p className="text-base font-semibold text-gray-600">Pay once, own it forever</p>
                                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                                        <span className="text-5xl font-semibold tracking-tight text-gray-900">$349</span>
                                        <span className="text-sm/6 font-semibold tracking-wide text-gray-600">USD</span>
                                    </p>
                                    <a href="#" className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get access</a>
                                    <p className="mt-6 text-xs/5 text-gray-600">Invoices and receipts available for easy company reimbursement</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};


const PricingBlocks = ({ tiers }: { tiers: PricingBlock[] }) => {

    const handleBuy = async (amount: number) => {
        const res = await fetch("/api/stripe/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quantity: amount }),
        })

        const { url } = await res.json()
        if (url) window.location.href = url
    }


    return (

        <div className="relative pt-16 sm:pt-14">
            <div className="inset-x-0 top-48 bottom-0" />
            <div className="relative mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 mb-6">
                    {tiers.map((tier, index) => (
                        <div
                            key={index}
                            className="my-4 grid grid-cols-1 shadow-[inset_0_0_2px_1px_#ffffff4d] rounded-lg ring-1 ring-black/5 max-lg:mx-auto max-lg:w-full max-lg:max-w-md"
                        >
                            <div className="grid grid-cols-1 p-2 shadow-md shadow-black/5">
                                <div className="rounded-lg bg-white p-10 pb-9 shadow-2xl ring-1 ring-black/5">
                                    <h2 className="text-sm font-semibold text-indigo-600">
                                        {tier.name} <span className="sr-only">plan</span>
                                    </h2>
                                    <p className="mt-2 text-sm/6 text-pretty text-gray-600">{tier.description}</p>
                                    <div className="mt-8 flex items-center gap-4">
                                        <div className="text-5xl font-semibold text-gray-950">{tier.amount} </div>
                                        <div className="text-2xl text-gray-600">
                                            <p>{tier.currency}</p>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <button
                                            key={tier.amount} onClick={() => handleBuy(tier.amount/5)}
                                            aria-label={`Start a free trial on the ${tier.name} plan`}
                                            className="w-full inline-block rounded-md bg-indigo-400 px-3.5 py-2 text-center text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Order now
                                        </button>
                                    </div>
                                    <div className="mt-8">
                                        <h3 className="text-sm/6 font-medium text-gray-950">Why this would be for you:</h3>
                                        <ul className="mt-3 space-y-3">
                                            {tier.features.map((feature, index) => (
                                                <li
                                                    key={index}
                                                    className="group flex items-start gap-4 text-sm/6 text-gray-600 data-disabled:text-gray-400"
                                                >
                                                    <span className="inline-flex h-6 items-center">
                                                        <PlusIcon
                                                            aria-hidden="true"
                                                            className="size-4 fill-gray-400 group-data-disabled:fill-gray-300"
                                                        />
                                                    </span>
                                                    {feature.description}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


export {
    PricingSingle,
    PricingBlocks
}


