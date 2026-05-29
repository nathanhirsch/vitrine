'use client'

import { useRef, useState, useEffect } from 'react'

type Result = {
  prediction: string
  confidence: number
}

export function MnistClassifier() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasDrawing, setHasDrawing] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  function getPos(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    }
  }

  function startDraw(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const { x, y } = getPos(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
    setIsDrawing(true)
    setHasDrawing(true)
  }

  function draw(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!isDrawing) return
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const { x, y } = getPos(e)
    ctx.lineWidth = 22
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = '#fff'
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  function stopDraw() {
    setIsDrawing(false)
  }

  function clear() {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    setResult(null)
    setError(null)
    setHasDrawing(false)
  }

  async function predict() {
    const canvas = canvasRef.current!

    // Resize to 28×28 before sending — model was trained on MNIST dimensions
    const offscreen = document.createElement('canvas')
    offscreen.width = 28
    offscreen.height = 28
    const offCtx = offscreen.getContext('2d')!
    offCtx.drawImage(canvas, 0, 0, 28, 28)
    const base64 = offscreen.toDataURL('image/png')

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('https://nathanhirsch-mnistdemo.hf.space/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64 }),
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
        <h3 className="text-base font-medium text-white">Is it a 3 or a 7?</h3>
        <p className="text-sm text-slate-400">
          Draw a digit in the canvas and the model will predict whether it is a 3 or a 7.
        </p>
      </div>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        {/* Canvas + buttons */}
        <div className="shrink-0 space-y-2">
          <canvas
            ref={canvasRef}
            width={280}
            height={280}
            className="block rounded-lg cursor-crosshair touch-none"
            style={{ border: '1px solid rgba(148,163,184,0.15)' }}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            onMouseLeave={stopDraw}
          />
          <div className="flex gap-2">
            <button
              onClick={predict}
              disabled={loading || !hasDrawing}
              className="flex-1 rounded-md border border-yellow-400/55 bg-yellow-500/10 px-3 py-1.5 text-sm font-medium text-yellow-200 transition hover:bg-yellow-500/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? 'Predicting...' : 'Predict'}
            </button>
            <button
              onClick={clear}
              className="rounded-md border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-sm font-medium text-slate-300 transition hover:border-yellow-400/40 hover:bg-slate-900"
            >
              Clear
            </button>
          </div>
        </div>

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
                <span className="text-2xl font-semibold text-white">{result.prediction}</span>
                <span className="rounded-full border border-yellow-400/45 bg-yellow-500/10 px-2.5 py-0.5 text-xs font-medium text-yellow-200">
                  {confidence}% confidence
                </span>
              </div>
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
            <p className="text-sm text-slate-500">Draw a digit and hit Predict.</p>
          )}
        </div>
      </div>
    </div>
  )
}
