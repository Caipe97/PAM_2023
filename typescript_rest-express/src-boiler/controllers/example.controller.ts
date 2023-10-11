import { Request, Response } from "express";


function helloworld(req: Request, res: Response){
    res.send({message: 'hello world!'})
    return
}

export {helloworld}