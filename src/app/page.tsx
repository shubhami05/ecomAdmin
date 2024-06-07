'use client'

import { useSession, signIn, signOut } from "next-auth/react"
export default function Home() {
  const { data: session } = useSession()
  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-zinc-200 dark:bg-zinc-900">
        <div className="text-center w-full border">
          <button onClick={()=>signIn('google')} className="bg-zinc-50 p-2 px-4 rounded-md font-medium dark:text-white dark:bg-zinc-700 hover:bg-zinc-800 transition-colors ">Login with Google</button>
        </div>
      </main>
    );
  }

  return(
    <div>Logged in {session.user?.email}</div>
  )
}
