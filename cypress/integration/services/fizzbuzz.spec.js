import { baseURL } from './../../../cypress';

describe('Fizzbuzz api Testing with Cypress', () => {
    it('should create a board', () => {
        cy.request({
        method : 'POST',
        url:`${baseURL}/fizzbuzz`, 
        qs: {
          count :100
        }
        }).then((response) => {
            return new Promise(resolve => {  
                expect(response).property('status').to.equal(200)
                expect(response.body).property('result').to.equal([])
                expect(response.body).property('status').to.be(["success"])
                const body = (response.body)
                result = body['result']
                resolve(result)
            })
        })
    })
 });