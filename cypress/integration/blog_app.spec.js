describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Jaska Jokunen',
      username: 'jaska',
      password: 'jaska'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Bloglist')
    cy.contains('Bloglist app, Full Stack Web Development')
    cy.contains('University of Helsinki 2020')
  })

  it('login form is shown', function() {
    cy.contains('sign in').click()
  })

  describe('Login',function() {

    it('succeeds with correct credentials', function() {
      cy.contains('sign in').click()
      cy.get('#username').type('jaska')
      cy.get('#password').type('jaska')
      cy.get('#login-button').click()

      cy.get('html').should('contain', 'Jaska Jokunen logged in')
    })

    it('fails with wrong credentials: empty password', function() {
      cy.contains('sign in').click()
      cy.get('#username').type('jaska')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'both fields are required')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .should('have.css', 'border-style', 'solid')
    })

    it('fails with wrong credentials: wrong password', function() {
      cy.contains('sign in').click()
      cy.get('#username').type('jaska')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .should('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Jaska Jokunen logged in')
    })
  })

  describe('when logged in', function() {

    beforeEach(function () {
      cy.login({ username: 'jaska', password: 'jaska' })
    })

    it('a blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Some Important Blog Title')
      cy.get('#author').type('Some Guy or Gal')
      cy.get('#url').type('http://testblogadrress.com/')
      cy.get('#add-button').click()

      cy.get('html').should('contain', 'Some Important Blog Title')

      cy.contains('Some Important Blog Title')
      cy.get('#show-button').click()
      cy.get('#delete-button').click()
    })

    describe('and a blog exists', function () {

      beforeEach(function () {
        cy.createBlog({
          title: 'Other Important Blog Title',
          author: 'Some Guy or Gal',
          url: 'http://othertestblogadrress.com/',
          likes: 0
        })
      })

      it('it can be liked', function () {
        cy.contains('Other Important Blog Title')
        cy.get('#show-button').click()

        cy.get('html').should('contain', 'Likes: 0')

        cy.contains('Other Important Blog Title')
        cy.get('#like-button').click()

        cy.get('html').should('contain', 'Likes: 1')
      })

      it('it can be deleted', function () {
        cy.contains('Other Important Blog Title')
        cy.get('#show-button').click()
        cy.get('#delete-button').click()

        cy.get('html').should('contain', 'deleted `Other Important Blog Title`')
        cy.wait(4500)
        cy.get('html').should('not.contain', 'Other Important Blog Title')
      })

      it('it can not be deleted by other than blog adder', function () {
        cy.logout()

        const user = {
          name: 'Aku Ankka',
          username: 'aku',
          password: 'ankka'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)

        cy.login({ username: 'aku', password: 'ankka' })

        cy.contains('Other Important Blog Title')
        cy.get('#show-button').click()
        cy.get('html').should('not.contain', 'delete')
      })

    }) // and a blog exists ends

    describe('and several blogs exist', function () {

      beforeEach(function () {
        cy.createBlog({
          title: 'First Important Blog Title',
          author: 'Some Guy or Gal',
          url: 'http://firsttestblogadrress.com/',
          likes: 1
        })
        cy.createBlog({
          title: 'Second Important Blog Title',
          author: 'Some Guy or Gal',
          url: 'http://secondtestblogadrress.com/',
          likes: 100
        })
        cy.createBlog({
          title: 'Third Important Blog Title',
          author: 'Some Guy or Gal',
          url: 'http://thirdtestblogadrress.com/',
          likes: 50
        })
      })

      it('blogs are sorted by likes descending', function () {
        cy.contains('First Important Blog Title')
          .parent().parent().parent().find('#show-button').as('showFirst')
        cy.get('@showFirst').click()

        cy.contains('Second Important Blog Title')
          .parent().parent().parent().find('#show-button').as('showSecond')
        cy.get('@showSecond').click()

        cy.contains('Third Important Blog Title')
          .parent().parent().parent().find('#show-button').as('showThird')
        cy.get('@showThird').click()

        cy.get('HTML').find('.likes').find('.like')
          .then(elem => {
            const pattern = /[0-9]+/g
            const num1 = elem.get(0).textContent
            const number1 = Number(num1.match(pattern))

            const num2 = elem.get(1).textContent
            const number2 =  Number(num2.match(pattern))

            const num3 = elem.get(2).textContent
            const number3 =  Number(num3.match(pattern))

            expect(number1).to.be.greaterThan(number2)
            expect(number2).to.be.greaterThan(number3)
          })
      })

    }) // and several blogs exist ends

  }) // when logged in ends

})
