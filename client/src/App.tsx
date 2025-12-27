export default function App() {
  return (
    <div className='min-h-screen bg-neutral-950 text-neutral-100'>
      <header className='mx-auto max-w-5xl px-6 py-10'>
        <p className='text-sm text-neutral-400'>Kelvin's Portfolio</p>
        <h1 className='mt-2 text-3xl font-semibold trcking-tight'>
          Week 1 - Day 1 Setup Complete! ✅
        </h1>

        <p className='mt-3 max-w-w-2xl text-neutral-300'>
          React + Tailwind is running smoothly. Tmr we'll add snap sections (Bio / Work / Projects / Contact).
        </p>

        <div className='mt-8 grid gap-4 sm:grid-cols-2'>

          <div className='rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5'>
            <p className='text-neutral-200 font-medium'>Client</p>
            <p className='mt-1 text-sm text-neutral-400'>
              Vite + React + TypeScript + Tailwind
            </p>
          </div>

          <div className='rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5'>
            <p className='text-neutral-200 font-medium'>Server (tmr)</p>
            <p className='mt-1 text-sm text-neutral-400'>
              Node + Express + MongoDB Atlas (Contact Messages)
            </p>
          </div>

        </div>

      </header>
    </div>

      
  );
}