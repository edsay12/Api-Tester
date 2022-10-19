import router from 'express'
import SectionController from '../controller/SectionController';
const userRouter = router()


userRouter.post('/sessions',SectionController.store)

export default userRouter;