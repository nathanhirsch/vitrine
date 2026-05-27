'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'

type Result = {
  prediction: string
  confidence: number
}

export function PandaDogClassifier() {
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setPreview(URL.createObjectURL(file))
    setResult(null)
    setError(null)
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('https://nathanhirsch-nhdemo.hf.space/predict', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error(`Server error: ${res.status}`)

      const data: Result = await res.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const confidence = result ? Math.round(result.confidence * 100) : 0

  return (
    <div className="rounded-xl border border-slate-700/80 bg-slate-900/40 p-6 space-y-5">
      <div className="space-y-1">
        <h3 className="text-base font-medium text-white">Is it a dog or a panda?</h3>
        <p className="text-sm text-slate-400">
          Upload any image and the model will predict whether it is a dog or a panda.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        {/* Upload area */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-36 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-600 bg-slate-950/40 text-sm text-slate-400 transition hover:border-yellow-400/50 hover:text-slate-300 sm:w-48 sm:shrink-0"
        >
          <svg className="h-6 w-6 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
          </svg>
          {preview ? 'Change image' : 'Upload image'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />

        {/* Preview */}
        {preview && (
          <div className="relative h-36 w-full overflow-hidden rounded-lg border border-slate-700/60 sm:w-48 sm:shrink-0">
            <Image src={preview} alt="Uploaded image" fill className="object-cover" unoptimized />
          </div>
        )}

        {/* Result */}
        <div className="flex flex-1 flex-col justify-center">
          {loading && (
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-600 border-t-yellow-400" />
              Running inference...
            </div>
          )}

          {error && !loading && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          {result && !loading && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-semibold capitalize text-white">
                  {result.prediction}
                </span>
                <span className="rounded-full border border-yellow-400/45 bg-yellow-500/10 px-2.5 py-0.5 text-xs font-medium text-yellow-200">
                  {confidence}% confidence
                </span>
              </div>

              {/* Confidence bar */}
              <div className="space-y-1">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-yellow-400/70 transition-all duration-500"
                    style={{ width: `${confidence}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500">{confidence}% sure it&apos;s a {result.prediction}</p>
              </div>
            </div>
          )}

          {!loading && !result && !error && (
            <p className="text-sm text-slate-500">Upload an image to see the prediction.</p>
          )}
        </div>
      </div>
    </div>
  )
}
