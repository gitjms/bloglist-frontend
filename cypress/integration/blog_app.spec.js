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

  it('login form can be opened', function() {
    cy.contains('sign in').click()
  })

  it('user can log in', function() {
    cy.contains('sign in').click()
    cy.get('#username').type('jaska')
    cy.get('#password').type('jaska')
    cy.get('#login-button').click()
    cy.contains('Jaska Jokunen logged in')
  })

  describe('when logged in', function() {

    beforeEach(function() {
      cy.contains('sign in').click()
      cy.get('#username').type('jaska')
      cy.get('#password').type('jaska')
      cy.get('#login-button').click()
    })

    it('a new note can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Some Important Blog Title')
      cy.get('#author').type('Some Guy or Gal')
      cy.get('#url').type('http://testblogadrress.com/')
      cy.get('#add-button').click()
      cy.contains('Some Important Blog Title')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.contains('new blog').click()
        cy.get('#title').type('Some Other Important Blog Title')
        cy.get('#author').type('Some Other Guy or Gal')
        cy.get('#url').type('http://anothertestblogadrress.com/')
        cy.get('#add-button').click()
        cy.reload()
      })

      it('it can be liked', function () {
        cy.contains('Some Other Important Blog Title')
        cy.get('#show-button').click()
        cy.get('#like-button').click()
        cy.contains('Likes: 1')
      })
    })

  })

})