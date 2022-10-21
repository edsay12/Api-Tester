import request from 'supertest'; 
import app from '../../app'
import truncateUser from "../utils/truncate";
import {StatusCodes} from 'http-status-codes'
import {UserType} from '../../@types/User'


describe('User', () => {
    afterEach(async ()=>{
      await truncateUser()

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
    test('user shoulbe create in db',async ()=>{
      const response = await request(app)
      .post('/user/create')
      .send({
        name:'edsay12',
        email:'edvandearaujo2@hotmail.com',
        password:'123456'
      })
      console.log(response)
      expect(response.status).toBe(200)
    })

    test('should retur a token if user exist', async()=>{
      const response = await request(app).post('/user/login').send({
        email:'',
        password:''

      })

    })

    test('user should be persists if login and password is correct',async()=>{
      const response = await request(app).post('/user/login').send({
        email:'',
        password:''
      })

    })

    test('should return a 500 error if user dont exists in db ',async()=>{
      const response = await request(app).post('/user/login').send({
        email:'',
        password:''
      })
    })

  
  });