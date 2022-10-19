import app from './app'
import { UserModel } from './models/userModel';


app.listen(8081, async ()=>{
  await UserModel.sync()
  console.log('app runner in 8081')


});
