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
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={
              active === tab.id
                ? 'rounded-full border border-yellow-400/55 bg-yellow-500/10 px-4 py-1.5 text-sm font-medium text-yellow-200 transition'
                : 'rounded-full border border-slate-700/60 bg-slate-900/40 px-4 py-1.5 text-sm font-medium text-slate-400 transition hover:border-slate-600 hover:text-slate-200'
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
