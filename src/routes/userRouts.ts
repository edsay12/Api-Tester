import router from 'express'
import SectionController from '../controller/SectionController';
const userRouter = router()


userRouter.post('/user/create',SectionController.store)
userRouter.post('/user/login',SectionController.login)
userRouter.post('/user/update/:userId',SectionController.updateUser)
userRouter.post('/user/delete/:userId',SectionController.removeUser)

export default userRouter;
