import { type PrismaClient, type Prisma } from "@prisma/client"
import { Router, type Express } from "express"
import * as ExampleController from "../controllers/example.controller"

const ExampleRoute = (prisma: PrismaClient) => {
  const router = Router()
  // Acá van las distintas subrutas o endpoints finales
  router.get('/', ExampleController.helloworld)
  return router
}
export default ExampleRoute

