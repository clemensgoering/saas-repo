export type PriceFeature = {
    description: string
}

export type PricingBlock = {
    name: string,
    description: string,
    amount: number,
    currency: string,
    features: PriceFeature[]
}