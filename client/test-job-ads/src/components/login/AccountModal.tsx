import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

export interface AccountModalProps {
  children: React.ReactNode
}

export const AccountModal = ({ children }: AccountModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Seeds Account</DialogTitle>
          <DialogDescription className='text-neutral-600'>Copy and paste email here to login</DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-4'>
          <div>
            <p>Login to company A</p>
            <ul className='pl-6 list-disc'>
              <li>amdin_a@companya.com</li>
              <li>admin_ab@companya.com</li>
              <li>user_a@companya.com</li>
            </ul>
          </div>

          <div>
            <p>Login to company B</p>
            <ul className='pl-6 list-disc'>
              <li>amdin_b@companyb.com</li>
              <li>admin_bb@companyb.com</li>
              <li>user_b@companyb.com</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
