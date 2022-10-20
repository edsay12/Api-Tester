import { UserModel } from "../../models/userModel";
import request from 'supertest'; 
import app from '../../app'
import truncateUser from "../utils/truncate";
import {StatusCodes} from 'http-status-codes'

describe('example', () => {
    beforeEach(async ()=>{
      await truncateUser()

    })
    test('user shoulbe create in db',async ()=>{
        
      const response = await request(app)
      .post('/user/create')
      .send({
        name:'edsay12',
        email:'edvandearaujo2@hotmail2.com',
        password:'123456'
      })
      expect(response.status).toBe(200)
         
  

    })

    test('email should be valid',async ()=>{
        
      const response = await request(app)
      .post('/user/create')
      .send({
        name:'edsay12',
        email:'edvan@',
        password:'123456'
      })
      expect(response.status).toBe(StatusCodes.BAD_REQUEST)
         
  

    })
  });