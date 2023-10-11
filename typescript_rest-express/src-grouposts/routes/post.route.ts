import { type PrismaClient, type Prisma } from "@prisma/client"
import { Router, type Express } from "express"

const PostRoute = (prisma: PrismaClient) => {
  const router = Router()

  router.get('/', async (req, res) => {
    const posts = await prisma.post.findMany()
    res.json(posts)
  })

  router.post(`/`, async (req, res) => {
    const { content, authorId, groupId } = req.body
    const result = await prisma.post.create({
      data: {
        content: content,
        author: {
          connect: {
            id: authorId
          }
        },
        group: {
          connect: {
            id: groupId
          }
        }
      },
    })
    res.json(result)
  })

  return router
}

export default PostRoute

