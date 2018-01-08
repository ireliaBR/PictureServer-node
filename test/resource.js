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
                .get('/resource/C7EE91B33FAE5EFAE45AF58088297E62.png')
                .expect('picture not found')
                .expect(404, done)
        })

        it('success', (done) => {
            request
                .get('/resource/C7EE91B33FAE5EFAE45AF58088297E60.png')
                .expect('Content-Type', 'image/png')
                .expect(200, done)
        })
    })
})