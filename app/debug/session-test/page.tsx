'use client'

import { ElevatedCard, getContainerClasses, getSectionClasses, PrimaryButton, SecondaryButton } from '@/components/ui'
import { createClient } from '@/lib/supabase/client'
import { signInWithSync, syncSession } from '@/lib/supabase/session-sync'
import { useState } from 'react'

export default function SessionTestPage() {
  const [results, setResults] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const log = (message: string) => {
    console.log(message)
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testClientSession = async () => {
    setLoading(true)
    setResults([])
    
    try {
      log('🧪 Testing Client Session...')
      
      const supabase = createClient()
      
      // Test 1: Check existing session
      log('1️⃣ Checking existing session...')
      const { data: { session }, error } = await supabase.auth.getSession()
      log(`Session exists: ${!!session}, User: ${session?.user?.email || 'None'}`)
      if (error) log(`Session error: ${error.message}`)
      
      // Test 2: Sign in with sync
      log('2️⃣ Signing in with sync...')
      const signInResult = await signInWithSync('manager@inopnc.com', 'password123')
      log(`Sign in result: ${signInResult.success}`)
      if (!signInResult.success) {
        log(`Sign in error: ${signInResult.error}`)
        return
      }
      
      // Test 3: Check session after sign in
      log('3️⃣ Checking session after sign in...')
      const { data: { session: newSession } } = await supabase.auth.getSession()
      log(`New session exists: ${!!newSession}, User: ${newSession?.user?.email || 'None'}`)
      
      // Test 4: Check cookies
      log('4️⃣ Checking browser cookies...')
      const cookies = document.cookie
      const hasSupabaseCookies = cookies.includes('sb-')
      log(`Has Supabase cookies: ${hasSupabaseCookies}`)
      if (hasSupabaseCookies) {
        const sbCookies = cookies.split(';').filter(c => c.includes('sb-')).map(c => c.trim().split('=')[0])
        log(`Supabase cookie names: ${sbCookies.join(', ')}`)
      }
      
      // Test 5: Test server session via API
      log('5️⃣ Testing server session...')
      const response = await fetch('/api/test-browser-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'check-session' })
      })
      const serverResult = await response.json()
      log(`Server session: ${serverResult.session}, User: ${serverResult.user || 'None'}`)
      log(`Server cookies: ${serverResult.cookies}, Names: ${serverResult.cookieNames?.join(', ') || 'None'}`)
      
      // Test 6: Sync session
      log('6️⃣ Syncing session...')
      const syncResult = await syncSession()
      log(`Sync result: ${syncResult.success}`)
      if (!syncResult.success) {
        log(`Sync error: ${syncResult.error}`)
      }
      
      // Test 7: Test server session again
      log('7️⃣ Testing server session after sync...')
      await new Promise(resolve => setTimeout(resolve, 1000)) // Wait for propagation
      const response2 = await fetch('/api/test-browser-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'check-session' })
      })
      const serverResult2 = await response2.json()
      log(`Server session after sync: ${serverResult2.session}, User: ${serverResult2.user || 'None'}`)
      log(`Server cookies after sync: ${serverResult2.cookies}, Names: ${serverResult2.cookieNames?.join(', ') || 'None'}`)
      
      log('✅ Test completed!')
      
    } catch (error) {
      log(`❌ Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const clearSession = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      log('🧹 Session cleared')
    } catch (error) {
      log(`❌ Clear failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      <div className={getContainerClasses()}>
        <div className="py-6">
          <div className={getSectionClasses()}>
            <ElevatedCard className="p-6">
              <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--text)' }}>Session Synchronization Test</h1>
              
              <div className="space-y-4 mb-8">
                <PrimaryButton
                  onClick={testClientSession}
                  disabled={loading}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  {loading ? 'Testing...' : 'Test Client Session'}
                </PrimaryButton>
                
                <SecondaryButton
                  onClick={clearSession}
                  disabled={loading}
                  className="bg-red-500 hover:bg-red-600 text-white ml-4"
                >
                  Clear Session
                </SecondaryButton>
              </div>
              
              <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--card-bg)' }}>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>Test Results</h2>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {results.map((result, index) => (
                    <div key={index} className="font-mono text-sm p-2 rounded" style={{ backgroundColor: 'var(--muted-bg)' }}>
                      {result}
                    </div>
                  ))}
                </div>
                {results.length === 0 && (
                  <p className="italic" style={{ color: 'var(--muted)' }}>No results yet. Click "Test Client Session" to start.</p>
                )}
              </div>
            </ElevatedCard>
          </div>
        </div>
      </div>
    </div>
  )
}