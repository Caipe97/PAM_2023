import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const groupData: Prisma.GroupCreateInput[] = [
  {
    title: "Grupo de estudio"
  },
  {
    title: "Grupo de trabajo"
  },
]
const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Manuel',
    email: 'manu@uca.edu.ar',
  },
  {
    name: 'Pedro',
    email: 'pedro@uca.edu.ar',
  },
  {
    name: 'Camila',
    email: 'camila@uca.edu.ar',
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  for (const g of groupData) {
    const group = await prisma.group.create({
      data: g,
    })
    console.log(`Created group with id: ${group.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
