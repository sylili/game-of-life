describe("game of life e2e tests", () => {
  it("test popup window", () => {
    cy.visit("http://localhost:3000/game-of-life");

    cy.get('[data-testid="popup-description"]').should("not.exist");
    cy.get('[data-testid="popup-button"]').should("exist").click();

    cy.get('[data-testid="popup-description"]')
      .should("exist")
      .click()
      .should("exist");

    cy.get('[data-testid="overlay"]').should("exist").click("topLeft");

    cy.get('[data-testid="popup-description"]').should("not.exist");
    cy.get('[data-testid="overlay"]').should("not.exist");
  });
});
