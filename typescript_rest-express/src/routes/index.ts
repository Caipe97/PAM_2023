import { type PrismaClient } from "@prisma/client"
import { type Express } from "express"
import ExampleRoute from "./example.route"

const addRoutes = (app: Express, prisma: PrismaClient) => {
    // Acá van tus custom routers
    app.use('/example/', ExampleRoute(prisma))
}

export default addRoutes