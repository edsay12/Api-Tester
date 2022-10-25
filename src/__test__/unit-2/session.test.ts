import request from 'supertest'; 
import app from '../../app'
import truncateUser from "../utils/truncate";
import {StatusCodes} from 'http-status-codes'
import {UserType} from '../../types/User'




describe('User', () => {
    afterEach(async ()=>{
      await truncateUser()

    })
    
    test('Email should be valid', async ()=>{
      const response = await request(app)
      .post('/user/create')
      .send({
        name:'edsay12',
        email:'edvan@',
        password:'12345678'
      })
      expect(response.status).toBe(StatusCodes.BAD_REQUEST)
         
    })

    test('Password dont be null', async ()=>{
      const response = await request(app)
      .post('/user/create')
      .send({
        name:'edsay12',
        email:'edvan@gmail.com',
        password:''
      })
      expect(response.status).toBe(StatusCodes.BAD_REQUEST)
         
    })

    test('Password must have 8 or more caracters', async ()=>{
      const response = await request(app)
      .post('/user/create')
      .send({
        name:'edsay12',
        email:'edvan@gmail.com',
        password:'123456'
      })
      expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    })

    test('User should create in db', async ()=>{
      const response = await request(app)
      .post('/user/create')
      .send({
        name:'edsay12',
        email:'edvandearaujo2@hotmail.com',
        password:'12345678'
      })
      
      expect(response.status).toBe(StatusCodes.OK)
    })

    test('Cant have 2 equals email in db', async ()=>{
      let response = await request(app)
      .post('/user/create')
      .send({
        name:'edsay12',
        email:'edvandearaujo2@hotmail.com',
        password:'12345678'
      })

      response = await request(app)
      .post('/user/create')
      .send({
        name:'edsay12',
        email:'edvandearaujo2@hotmail.com',
        password:'12345678'
      })
      
      expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    })

    test('Should return a token if user exist', async()=>{
      let response = await request(app)
      .post('/user/create')
      .send({
        name:'edsay12',
        email:'edvandearaujo29@hotmail.com',
        password:'12345678'
      })
      
      response = await request(app).post('/user/login').send({
        email:'edvandearaujo29@hotmail.com',
        password:'12345678'
      })
      expect(response.status).toBe(StatusCodes.ACCEPTED)
     

      expect( typeof response.body.token === 'string').toBeTruthy()

      
      
    })

    test('Should return a 404 error if user dont exists in db ', async()=>{
      let response = await request(app)
      .post('/user/create')
      .send({
        name:'edsay12',
        email:'edvandearaujo2@hotmail.com',
        password:'12345678'
      })
      
      response = await request(app).post('/user/login').send({
        email:'edvandearaujo@hotmail.com',
        password:'12345678'
      })
    
      expect(response.status).toBe(StatusCodes.BAD_REQUEST)
      

    })

    test('Should delete user', async()=>{
      let response = await request(app)
      .post('/user/create')
      .send({
        name:'edsay12',
        email:'edvandearaujo2@hotmail.com',
        password:'12345678'
      })
      const userId = response.body.id
      

      response = await request(app)
      .post(`/user/delete/${userId}`)

     
      expect(response.status).toBe(StatusCodes.OK)

    })

    test('Id should be valid', async()=>{
      let response = await request(app)
      .post('/user/create')
      .send({
        name:'edsay12',
        email:'edvandearaujo2@hotmail.com',
        password:'12345678'
      })

      response = await request(app)
      .post(`/user/update/1`)
      .send({
        name:'edsay11',
        email:'edvandearaujo2@hotmail.com',
      })
      
      expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    })

    test('Should update user', async()=>{
      let response = await request(app)
      .post('/user/create')
      .send({
        name:'edsay12',
        email:'edvandearaujo2@hotmail.com',
        password:'12345678'
      })
      const userId = response.body.id

      response = await request(app)
      .post(`/user/update/${userId}`)
      .send({
        name:'edsay11',
        email:'edvandearaujo2@hotmail.com',
      })
      expect(response.status).toBe(StatusCodes.CREATED)

    })


 

   



  });