import { UserModel } from "../../models/userModel";
import bcrypt from 'bcrypt'
import truncateUser from "../utils/truncate";


describe('User',()=>{
    beforeEach(()=>{
        truncateUser()
    })

    it('should encrypt user password', async () => {
        const user:any = await UserModel.create({
            name:'edvan',
            email:'edvandearaujo2@gmail.com',
            password_hash:'123456'

        })
        const hash = await bcrypt.hash('123456',8)
        console.log(user.name)
        expect(user.password_hash).toBe(hash)

    })

})