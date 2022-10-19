 import {Request,Response,NextFunction} from 'express'
 class SectionController{
    store(req:Request,res:Response){
        res.sendStatus(200)

    }
}

export default new SectionController();