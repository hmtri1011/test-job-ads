'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { AccountModal } from '@/components/login/AccountModal'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLogin } from '@/hooks/useAuth'
import { storageKey } from '@/config'
import { getStorage } from '@/lib/utils'

const defaultEmail = 'admin_a@companya.com'

export interface LoginFormProps {}

export const LoginForm = () => {
  const router = useRouter()
  const [email, setEmail] = useState(defaultEmail)
  const { mutate: login, isPending } = useLogin()

  // Redirect to jobs page if user is already logged in
  useEffect(() => {
    const token = getStorage(storageKey.token)

    if (token) {
      router.replace('/jobs')
    }
  }, [router])

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) {
      return
    }

    login(email)
  }

  return (
    <Card className='mx-auto max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>Login</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form className='grid gap-4' onSubmit={handleLogin}>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder={defaultEmail}
              required
              defaultValue={defaultEmail}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <Button type='submit' className='w-full' disabled={!email || isPending}>
            Login
          </Button>
        </form>
        <div className='mt-4 text-center text-sm'>
          Don&apos;t have an account?{' '}
          <AccountModal>
            <span className='text-primary underline cursor-pointer'>View seeds here</span>
          </AccountModal>
        </div>
      </CardContent>
    </Card>
  )
}
