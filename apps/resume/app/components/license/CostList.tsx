
import { cn } from '@lib/utils'

const statuses = {
  Extended: 'text-green-700 bg-green-50 ring-green-600/20',
  Default: 'text-gray-600 bg-gray-50 ring-gray-500/10',
}
const CostItems = [
  {
    id: 1,
    name: 'Analyze PDF File',
    status: 'Extended',
    description: 'Analyzing uploaded PDF files',
    costs: 5
  },
  {
    id: 2,
    name: 'Feedback Interaction',
    status: 'Default',
    description: 'Asking Questions about your Resume and Analysis',
    costs: 5
  },
]

export default function Example() {
  return (
    <>
      <div className="border-b border-gray-200 pb-5">
        <h3 className="text-base font-semibold text-gray-900">Cost Overview</h3>
      </div>
      <ul role="list" className="divide-y divide-gray-100">
        {CostItems.map((costs) => (
          <li key={costs.id} className="flex items-center justify-between gap-x-6 py-5">
            <div className="min-w-0">
              <div className="flex items-start gap-x-3">
                <p className="text-sm/6 font-semibold text-gray-900">{costs.name}</p>
                <p
                  className={cn(
                    statuses[costs.status],
                    'mt-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium whitespace-nowrap ring-1 ring-inset',
                  )}
                >
                  {costs.status}
                </p>
              </div>
              <div className="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500">
                <p className="whitespace-nowrap">
                  {costs.description}
                </p>
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <div
                className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:block"
              >
                Coins: {costs.costs}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
