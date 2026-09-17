describe("Doctors Search", () => {

  beforeEach(() => {
    cy.visit("http://localhost:3000/doctors");
  });


  it("should search doctors by name", () => {

    cy.get('input[placeholder="Type doctor name"]')
      .type("Sami");

    cy.get(".search-button")
      .click();

    cy.contains("Dr. Sami Nasser")
      .should("be.visible");
  });


  it("should search doctors by specialization", () => {

    cy.get('input[placeholder="Choose specialization"]')
      .click();

    cy.get('[role="option"]')
      .contains("Children")
      .click();

    cy.get(".search-button")
      .click();

    cy.get("tbody tr")
      .should("have.length.at.least", 1);

    cy.get("tbody tr").each(($row) => {
      cy.wrap($row)
        .find("td")
        .eq(1)
        .should("contain", "Children");
    });
  });


  it("should search doctors by region", () => {

    cy.get('input[placeholder="Choose region"]')
      .click();

    cy.get('[role="option"]')
      .contains("Nablus")
      .click();

    cy.get(".search-button")
      .click();

    cy.get("tbody tr")
      .should("have.length.at.least", 1);

    cy.get("tbody tr").each(($row) => {
      cy.wrap($row)
        .find("td")
        .eq(2)
        .should("contain", "Nablus");
    });
  });


  it("should search using multiple filters", () => {

    cy.get('input[placeholder="Type doctor name"]')
      .type("Sami");

    cy.get('input[placeholder="Choose specialization"]')
      .click();

    cy.get('[role="option"]')
      .contains("Children")
      .click();

    cy.get('input[placeholder="Choose region"]')
      .click();

    cy.get('[role="option"]')
      .contains("Hebron")
      .click();

    cy.get(".search-button")
      .click();

    cy.get("tbody tr")
      .should("have.length", 1);

    cy.get("tbody tr")
      .first()
      .within(() => {

        cy.contains("Dr. Sami Nasser")
          .should("be.visible");

        cy.contains("Children")
          .should("be.visible");

        cy.contains("Hebron")
          .should("be.visible");

      });
  });


  it("should display no doctors when there is no match", () => {

    cy.get('input[placeholder="Type doctor name"]')
      .type("Ali");

    cy.get(".search-button")
      .click();

    cy.contains("No doctors found")
      .should("be.visible");
  });


  it("should display all doctors when no filters are selected", () => {

    cy.get(".search-button")
      .click();

    cy.get("tbody tr")
      .should("have.length.at.least", 1);
  });

});