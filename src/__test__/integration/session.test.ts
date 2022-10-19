import { UserModel } from "../../models/userModel";
import request from 'supertest'; 
import app from '../../app'
import truncateUser from "../utils/truncate";

describe('example', () => {
    beforeEach(async ()=>{
      await truncateUser()

    })
    test('user shoulbe create in db',async ()=>{
        const user:any = await UserModel.create({
           name:'edvan',
           email:'edvandearaujo2@hotmail.com.br.9',
           password_hash:'0099922'
         })
        
      const response = await request(app)
      .post('/sessions')
      .send({
        email:'edvandearaujo2@hotmail.com',
        password:'123456'
      })
      expect(response.status).toBe(200)
         
  

    })
  });