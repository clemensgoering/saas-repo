import { supabaseServer } from "@supabase/server"
import { redirect } from "next/navigation"
import { BuyCoins } from "../../components/license/BuyCoins"
import { PostCheckoutRefresher } from "../../utils/PostCheckout"
import { CoinHistoryList } from "../../components/license/CoinHistoryList"
import CostList from "../../components/license/CostList"
import SettingsHeader from "../../components/settings/SettingsHeader"
import { UserSettings } from "../../components/settings/UserSettings"
import { PricingBlocks } from "@repo/components/Pricing"

const tiers = [
  {
    name: 'Starter',
    description: 'Everything you need to get started.',
    amount: 2,
    currency: "€",
    href: '#',
    features: [
      { description: 'Custom domains' },
      { description: 'Edge content delivery' },
      { description: 'Advanced analytics' },
      { description: 'Quarterly workshops', disabled: true },
      { description: 'Single sign-on (SSO)', disabled: true },
      { description: 'Priority phone support', disabled: true },
    ],
  },
  {
    name: 'Extended',
    description: 'All the extras for your growing team.',
    amount: 10,
    currency: "€",
    features: [
      { description: 'Custom domains' },
      { description: 'Edge content delivery' },
      { description: 'Advanced analytics' },
      { description: 'Quarterly workshops' },
      { description: 'Single sign-on (SSO)', disabled: true },
      { description: 'Priority phone support', disabled: true },
    ],
  },
  {
    name: 'Power User',
    description: 'Added flexibility at scale.',
    amount: 50,
    currency: "€",
    features: [
      { description: 'Custom domains' },
      { description: 'Edge content delivery' },
      { description: 'Advanced analytics' },
      { description: 'Quarterly workshops' },
      { description: 'Single sign-on (SSO)' },
      { description: 'Priority phone support' },
    ],
  },
]

export default async function SettingsPage() {
  const supabase = await supabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  // local: to get webhook sk
  // stripe login
  // stripe listen --forward-to localhost:3000/api/stripe/webhook

  const buyCoins = async (amount: number) => {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      body: JSON.stringify({ quantity: amount }),
    })
    const { url } = await res.json()
    window.location.href = url
  }

  return (
    <>
      <PostCheckoutRefresher />
      <SettingsHeader userName={user.email} />

      <div className="min-h-screen mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* user settings */}
        <div className="grid grid-cols-1 pb-20">
          <div className="rounded-lg bg-white shadow-xs ring-1 ring-gray-900/5">
            <div className="px-6 py-6">
              <UserSettings userMail={user?.email} />
            </div>
          </div>
        </div>

        {/* buy coins */}
        <div className="grid grid-cols-1 py-24">
          <div className="rounded-lg bg-white shadow-xs ring-1 ring-gray-900/5">
            <div className="px-6 pt-16">
              <div className="mx-auto max-w-4xl px-6 max-lg:text-center lg:max-w-7xl lg:px-8">
                <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-950 sm:text-6xl lg:text-pretty">
                  Pricing that grows with your team size
                </h1>
                <p className="mt-6 max-w-2xl text-lg font-medium text-pretty text-gray-600 max-lg:mx-auto sm:text-xl/8">
                  Choose an affordable plan that’s packed with the best features for engaging your audience, creating customer
                  loyalty, and driving sales.
                </p>
              </div>
              <PricingBlocks tiers={tiers} />
            </div>
          </div>
        </div>


        {/* Coin History */}
        <div className="grid grid-cols-1">
          <div className="rounded-lg bg-white shadow-xs ring-1 ring-gray-900/5">
            <div className="px-6 py-6">
              <div className="border-b border-gray-200 pb-5">
                <h3 className="text-base font-semibold text-gray-900">Cost Overview</h3>
              </div>
              <div className="pt-6">
              <CoinHistoryList userId={user.id} />
              </div>
            </div>
          </div>
        </div>


        {/* cost list */}
        <div className="grid grid-cols-1 py-12">
          <div className="rounded-lg bg-white shadow-xs ring-1 ring-gray-900/5">
            <div className="px-6 py-6">
              <CostList />
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
