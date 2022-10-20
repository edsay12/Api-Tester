import router from 'express'
import SectionController from '../controller/SectionController';
const userRouter = router()


userRouter.post('/user/create',SectionController.store)

export default userRouter;