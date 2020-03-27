describe("Test my form", function(){
    beforeEach(function (){
        cy.visit("http://localhost:3000/pizza")
    })

    it('Add test to inputs and submit form', function(){
        cy.get('input[name="name"]')
            .type("Nyjae")
            .should("have.value", "Nyjae");

        cy.get("#sizes")
            .select("large")
            .should("have.value", "large")
        cy.get("textarea")
            .type("extra cheese")
            .should("have.value", "extra cheese")

        cy.get('input[name="pepperoni"]')
            .check()
            .should("be.checked")
        cy.get('input[name="sausage"]')
            .check()
            .should("be.checked")
        cy.get('input[name="cheese"]')
            .check()
            .should("be.checked")

        cy.get('input[name="mushroom"]')
            .check()
            .should("be.checked")
        cy.get('input[name="pineapple"]')
            .check()
            .should("be.checked")

        cy.get('button').click()
    })
})