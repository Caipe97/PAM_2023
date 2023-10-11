import { type PrismaClient, type Prisma } from "@prisma/client"
import { Router, type Express } from "express"

const GroupRoute = (prisma: PrismaClient) => {
  const router = Router()

  router.get('/', async (req, res) => {
    const {id} = req.query
    if(id && id.length){
      const group = await prisma.group.findUnique({
        where: {
          id: parseInt(id as string)
        },
        include: {
          members: {
            include: {
              user: true
            }
          },
          posts: {
            include: {
              author: true
            }
          }
        }
      })
      res.json(group)
      return
    }
    const groups = await prisma.group.findMany({
      include: {
        members: true,
        posts: true
      }
    })
    res.json(groups)
    return
  })
  
  // Crear nuevo grupo
  router.post(`/`, async (req, res) => {
    const { title, members, userId } = req.body
    const result = await prisma.group.create({
      data: {
        title,
        members: {
          create: [
            {
              user: userId,
              isAdmin: true
            }
          ]
        }
      },
    })
    res.json(result)
  })

  // Join grupo existente
  router.post(`/join`, async (req, res) => {
    const { userId, groupId, isAdmin } = req.body
    console.log(req.body)
    
    // check si el usuario existe
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })
    if(!user) res.status(400).send({message: "user not found"})

    // check si el grupo existe
    const group = await prisma.group.findUnique({
      where: {
        id: groupId
      }
    });
    if(!group) res.status(400).send({message: "group not found"})

    const newGroupUser = await prisma.groupUser.create({
      data: {
        isAdmin: isAdmin,
        userId: user!.id,
        groupId: group!.id
      }
    })
    res.json(newGroupUser)
  })

  return router
}

export default GroupRoute

