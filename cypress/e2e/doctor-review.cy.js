describe("Doctor Review", () => {

  beforeEach(() => {
    cy.visit("http://localhost:3000/doctors");
  });

  it("should open the review dialog", () => {

    cy.get("tbody tr")
      .contains("Dr. Sami Nasser")
      .parents("tr")
      .within(() => {

        cy.get('button[title="Review"]')
          .click();

      });

    cy.get('[role="dialog"]')
      .should("be.visible");

    cy.get('[role="dialog"]').within(() => {

      cy.contains("Review")
        .should("be.visible");

      cy.contains("Save")
        .should("be.visible");

      cy.contains("Close")
        .should("be.visible");

    });
  });


  it("should disable Save when no rating is selected", () => {

    cy.get("tbody tr")
      .contains("Dr. Sami Nasser")
      .parents("tr")
      .within(() => {

        cy.get('button[title="Review"]')
          .click();

      });

    cy.get('[role="dialog"]')
      .should("be.visible");

    cy.get('[role="dialog"]')
      .contains("Save")
      .should("be.disabled");
  });


  it("should enable Save after selecting a rating", () => {

    cy.get("tbody tr")
      .contains("Dr. Sami Nasser")
      .parents("tr")
      .within(() => {

        cy.get('button[title="Review"]')
          .click();

      });

    cy.get('[role="dialog"]')
      .should("be.visible");

    cy.get('[role="dialog"]')
      .find('input[type="radio"]')
      .eq(4)
      .check({ force: true });

    cy.get('[role="dialog"]')
      .contains("Save")
      .should("not.be.disabled");
  });


  it("should allow adding review notes", () => {

    cy.get("tbody tr")
      .contains("Dr. Sami Nasser")
      .parents("tr")
      .within(() => {

        cy.get('button[title="Review"]')
          .click();

      });

    cy.get('[role="dialog"]')
      .should("be.visible");

    cy.get('textarea[placeholder="Your notes (optional)"]')
      .type("Very good doctor");

    cy.get('textarea[placeholder="Your notes (optional)"]')
      .should("have.value", "Very good doctor");
  });
it("should save a review and display it", () => {

  const reviewNote = `Cypress test review ${Date.now()}`;

  cy.get("tbody tr")
    .contains("Dr. Sami Nasser")
    .parents("tr")
    .within(() => {

      cy.get('button[title="Review"]')
        .click();

    });

  cy.get('[role="dialog"]')
    .should("be.visible");

  cy.get('[role="dialog"]')
    .find('input[type="radio"]')
    .eq(4)
    .check({ force: true });

  cy.get('textarea[placeholder="Your notes (optional)"]')
    .type(reviewNote);

  cy.get('[role="dialog"]')
    .contains("Save")
    .click();

  cy.get('[role="dialog"]')
    .should("not.exist");

  cy.get("tbody tr")
    .contains("Dr. Sami Nasser")
    .parents("tr")
    .within(() => {

      cy.get('button[title="Overview"]')
        .click();

    });

  cy.url()
    .should("include", "/doctor/");

  cy.contains("Dr. Sami Nasser")
    .should("be.visible");

  cy.contains("Reviews")
    .should("be.visible");

  cy.contains("View")
    .first()
    .click();

  cy.get('[role="dialog"]')
    .should("be.visible");

  cy.get('[role="dialog"]')
    .contains("View Review")
    .should("be.visible");

  cy.get('[role="dialog"]')
    .find("textarea")
    .should("have.value", reviewNote);
});

  it("should view an existing review", () => {

    cy.get("tbody tr")
      .contains("Dr. Sami Nasser")
      .parents("tr")
      .within(() => {

        cy.get('button[title="Overview"]')
          .click();

      });

    cy.url()
      .should("include", "/doctor/");

    cy.contains("Reviews")
      .should("be.visible");

    cy.contains("View")
      .first()
      .click();

    cy.get('[role="dialog"]')
      .should("be.visible");

    cy.get('[role="dialog"]')
      .within(() => {

        cy.contains("View Review")
          .should("be.visible");

        cy.contains("Close")
          .should("be.visible");

      });
  });

});