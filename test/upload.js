import app from '../src/server'
import supertest from 'supertest'

const request = supertest.agent(app.listen())

describe('upload', () => {
    describe('picture', () => {
        it('success', (done) => {
            request
                .post('/upload')
                .field('name', 'mypicture')
                .attach('avatar', __dirname + '/123.png')
                .expect(200)
                .expect({message: 'success'}, done)
        })
    })
})