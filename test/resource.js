import app from '../src/app'
import supertest from 'supertest'

const request = supertest.agent(app.listen())

describe('resource', () => {
    describe('picture', () => {
        it('picture invalid syntax', done => {
            request
                .get('/resource/jaksldfjaklsdjf')
                .expect('picture invalid syntax')
                .expect(400, done)
        })

        it('picture not found', done => {
            request
                .get('/resource/c7ee91b33fae5efae45af58088297e62')
                .expect('picture not found')
                .expect(404, done)
        })

        it('origin picture success', (done) => {
            request
                .get('/resource/c7ee91b33fae5efae45af58088297e60')
                .expect('Content-Type', 'image/png')
                .expect(200, done)
        })
    })
})