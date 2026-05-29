'use client'

import { useState } from 'react'
import { PandaDogClassifier } from './PandaDogClassifier'
import { MnistClassifier } from './MnistClassifier'

const tabs = [
  { id: 'dog-panda', label: 'Dog or Panda?' },
  { id: 'mnist',     label: '3 or 7?' },
]

export function DemoTabs() {
  const [active, setActive] = useState('dog-panda')

  return (
    <div className="space-y-4">
      <div className="flex gap-1 rounded-lg border border-slate-700/60 bg-slate-950/40 p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={
              active === tab.id
                ? 'rounded-md px-4 py-1.5 text-sm font-medium text-white bg-slate-800 border border-slate-700/60 transition'
                : 'rounded-md px-4 py-1.5 text-sm font-medium text-slate-400 transition hover:text-slate-200'
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {active === 'dog-panda' && <PandaDogClassifier />}
      {active === 'mnist'     && <MnistClassifier />}
    </div>
  )
}
