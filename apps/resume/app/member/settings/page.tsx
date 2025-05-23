import { supabaseServer } from "@supabase/server"
import { redirect } from "next/navigation"
import { BuyCoins } from "../../components/license/BuyCoins"
import { PostCheckoutRefresher } from "../../utils/PostCheckout"
import { CoinHistoryList } from "../../components/license/CoinHistoryList"
import CostList from "../../components/license/CostList"
import SettingsHeader from "../../components/settings/SettingsHeader"
import { UserSettings } from "../../components/settings/UserSettings"

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

        <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {/* Right Side */}
          <div className="lg:col-start-3 lg:row-end-1">
            <div className="rounded-lg bg-white shadow-xs ring-1 ring-gray-900/5">
              <div className="px-6 py-6">
                <BuyCoins preset={[10, 20, 50]} />
              </div>
            </div>
          </div>

          {/* Left side */}
          <div className="py-8 bg-white shadow-xs ring-1 ring-gray-900/5 rounded-lg px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pt-16 xl:pb-20">
            <h2 className="text-base font-semibold text-gray-900">Coin History</h2>
            <div className="mt-6 grid grid-cols-1 text-sm/6 sm:grid-cols-2">
              <CoinHistoryList userId={user.id} />
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
