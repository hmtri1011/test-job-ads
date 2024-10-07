import { AccountModal } from '@/components/login/AccountModal'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account."

export default function LoginPage() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div>
        <h1 className='text-center text-3xl font-bold py-6 text-primary'>The Job Ads</h1>
        <Card className='mx-auto max-w-sm'>
          <CardHeader>
            <CardTitle className='text-2xl'>Login</CardTitle>
            <CardDescription>Enter your email below to login to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  required
                  defaultValue='user_a@companya.com'
                />
              </div>
              <Button type='submit' className='w-full'>
                Login
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              Don&apos;t have an account?{' '}
              <AccountModal>
                <span className='text-primary underline cursor-pointer'>View seeds here</span>
              </AccountModal>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
