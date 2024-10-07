import { LoginForm } from '@/components/login/LoginForm'

export default function LoginPage() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div>
        <h1 className='text-center text-3xl font-bold py-6 text-primary'>The Job Ads</h1>
        <LoginForm />
      </div>
    </div>
  )
}
