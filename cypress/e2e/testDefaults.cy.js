import Cell, { StyledCell } from "../../src/components/Cell";
import {
  EMPTY,
  OSCILLATOR,
  STILL_LIFE,
  STOPPED,
  getMessage,
} from "../../src/utilities/helper";

describe("game of life e2e tests", () => {
  it("test popup window", () => {
    cy.visit("http://localhost:3000/game-of-life");

    cy.getByTestId("popup-description").should("not.exist");
    cy.getByTestId("popup-button").should("exist").click();

    cy.getByTestId("popup-description").should("exist").click().should("exist");
    cy.getByTestId("overlay").should("exist").click("topLeft");

    cy.getByTestId("popup-description").should("not.exist");
    cy.getByTestId("overlay").should("not.exist");
  });

  it("test play button with empty board", () => {
    cy.visit("http://localhost:3000/game-of-life");

    cy.getByTestId("result-message").should("contain", getMessage(STOPPED));
    cy.getByTestId("play-button")
      .should("exist")
      .click()
      .getByTestId("result-message")
      .should("contain", getMessage(EMPTY));
  });

  it("background color changes by clicking on cell", () => {
    cy.visit("http://localhost:3000/game-of-life");

    cy.getByTestId("cell-0").should(
      "have.css",
      "background-color",
      "rgba(0, 0, 0, 0)"
    );

    cy.getByTestId("cell-0")
      .click()
      .should("have.css", "background-color", "rgb(165, 201, 202)");
  });

  it("test oscillator", () => {
    cy.visit("http://localhost:3000/game-of-life");

    cy.getByTestId("cell-95").click();
    cy.getByTestId("cell-96").click();
    cy.getByTestId("cell-97").click();
    cy.getByTestId("play-button")
      .click()
      .getByTestId("result-message")
      .should("contain", getMessage(OSCILLATOR));
  });

  it("test still life", () => {
    cy.visit("http://localhost:3000/game-of-life");

    cy.getByTestId("cell-31").click();
    cy.getByTestId("cell-32").click();
    cy.getByTestId("cell-61").click();
    cy.getByTestId("cell-62").click();
    cy.getByTestId("play-button")
      .click()
      .getByTestId("result-message")
      .should("contain", getMessage(STILL_LIFE));
  });

  it("test reset ", () => {
    cy.visit("http://localhost:3000/game-of-life");
    cy.getByTestId("cell-1").should(
      "have.css",
      "background-color",
      "rgba(0, 0, 0, 0)"
    );

    cy.getByTestId("cell-1")
      .click()
      .should("have.css", "background-color", "rgb(165, 201, 202)");

    cy.getByTestId("play-button")
      .click()
      .getByTestId("result-message")
      .should("contain", getMessage(EMPTY));

    cy.getByTestId("cell-1").should(
      "have.css",
      "background-color",
      "rgba(0, 0, 0, 0)"
    );

    cy.getByTestId("reset-button")
      .click()
      .getByTestId("cell-1")
      .should("have.css", "background-color", "rgb(165, 201, 202)");
  });
});

afterEach(() => {
  cy.getByTestId("clear-button").click();
});
