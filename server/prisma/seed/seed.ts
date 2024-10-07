import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // seed company A
  await prisma.company.upsert({
    where: { id: '2ac4f543-ddb0-408d-8c7d-cee00b8d3610' },
    update: {},
    create: {
      id: '2ac4f543-ddb0-408d-8c7d-cee00b8d3610',
      name: 'Company A',
      employers: {
        create: [
          {
            email: 'admin_a@companya.com',
            name: 'Admin A',
            role: 'ADMIN'
          },
          {
            email: 'admin_ab@companya.com',
            name: 'Admin AB',
            role: 'ADMIN'
          },
          {
            email: 'user_a@companya.com',
            name: 'User A',
            role: 'USER'
          }
        ]
      }
    }
  })

  // seed company B
  await prisma.company.upsert({
    where: { id: 'e7c926e1-30c3-4697-b89b-7cc9624750ea' },
    update: {},
    create: {
      id: 'e7c926e1-30c3-4697-b89b-7cc9624750ea',
      name: 'Company B',
      employers: {
        create: [
          {
            email: 'admin_b@companyb.com',
            name: 'Admin B',
            role: 'ADMIN'
          },
          {
            email: 'admin_bb@companyb.com',
            name: 'Admin BB',
            role: 'ADMIN'
          },
          {
            email: 'user_b@companyb.com',
            name: 'User B',
            role: 'USER'
          }
        ]
      }
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
