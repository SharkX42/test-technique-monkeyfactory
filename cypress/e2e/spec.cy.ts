describe('Tests e2e routing', () => {
  it('Visite de la page principale', () => {
    cy.visit('/')
    cy.contains('Bonjour')
  });

  it('Redirection vers la page d accueil en cas d acces à la page de resultat manuellement', () => {
    cy.visit('/informationsUser')
    cy.contains('Bonjour')
  })
});

describe('Tests formulaire', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Par défaut, le bouton de validation ne doit pas être cliquable', () => {
    cy.get('#btnValid').should('be.disabled')

  })

  it('Remplissage du formulaire et redirection vers la page de résultat', () => {
    cy.get('#firstName').should('be.visible').type('Léo')
    cy.get('#lastName').should('be.visible').type('Delabre')
    cy.get('#dateOfBirth').should('be.visible').type('28/12/1999')

    cy.get('#btnValid').should('be.enabled').click()

    cy.contains('Bienvenue Léo Delabre').should('be.visible')

    cy.url().should('include', '/informationsUser')
  })

  it('Remplissage du formulaire et redirection vers la page de résultat', () => {
    cy.get('#firstName').should('be.visible').type('Léo')
    cy.get('#lastName').should('be.visible').type('Delabre')
    cy.get('#dateOfBirth').should('be.visible').type('28/12/1999')

    cy.get('#btnValid').should('be.enabled').click()

    cy.contains('Bienvenue Léo Delabre').should('be.visible')

    cy.url().should('include', '/informationsUser')
  })

  it('Affichage des messages d erreur : obligatoire', () => {
    cy.get('#firstName').should('be.visible').click()
    cy.get('#lastName').should('be.visible').click()
    cy.contains('Obligatoire').should('be.visible')
  })

  it('Affichage des messages d erreur sur les caractères spéciaux', () => {
    cy.get('#firstName').should('be.visible').type('Léo8')
    cy.get('#lastName').should('be.visible').click()
    cy.contains('Le nom de doit pas contenir de chiffre, d\'espace ni de caractère spécial').should('be.visible')
  })

  it('Affichage du message d erreur pour le format de date', () => {
    cy.get('#dateOfBirth').should('be.visible').type('LéoDelabre')
    cy.get('#lastName').should('be.visible').click()
    cy.contains('La date doit être valide et au format JJ/MM/AAAA').should('be.visible')
  })

  it('Affichage du message d erreur pour une date dans le futur', () => {
    cy.get('#dateOfBirth').should('be.visible').type('28/12/2022')
    cy.get('#lastName').should('be.visible').click()
    cy.contains('La date doit être inférieure à aujourd\'hui').should('be.visible')
  })
});
