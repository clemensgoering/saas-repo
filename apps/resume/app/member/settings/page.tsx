import { supabaseServer } from "@supabase/server"
import { redirect } from "next/navigation"
import {
  Dialog,
  DialogPanel,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import {
  Bars3Icon,
  CalendarDaysIcon,
  CreditCardIcon,
  EllipsisVerticalIcon,
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  UserCircleIcon,
  XMarkIcon as XMarkIconMini,
} from '@heroicons/react/20/solid'

export default async function SettingsPage() {
  const supabase = await supabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  return (
      <div className="min-h-screen mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {/* Invoice summary */}
          <div className="lg:col-start-3 lg:row-end-1">
            <div className="rounded-lg bg-white shadow-xs ring-1 ring-gray-900/5">
              <div className="px-6 py-6">
                <a href="#" className="text-sm/6 font-semibold text-gray-900">
                  Right Side
                </a>
              </div>
            </div>
          </div>

          {/* Invoice */}
          <div className="py-8 bg-white shadow-xs ring-1 ring-gray-900/5 rounded-lg px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pt-16 xl:pb-20">
            <h2 className="text-base font-semibold text-gray-900">Settings</h2>
            <div className="mt-6 grid grid-cols-1 text-sm/6 sm:grid-cols-2">
              Left side
            </div>
          </div>


        </div>
      </div>
  )
}
