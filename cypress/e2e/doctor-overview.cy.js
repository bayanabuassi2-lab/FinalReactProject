describe("Doctor Overview", () => {

  beforeEach(() => {
    cy.visit("http://localhost:3000/doctors");
  });


  it("should open doctor overview", () => {

    cy.get('button[title="Overview"]')
      .first()
      .click();

    cy.url()
      .should("include", "/doctor/");

    cy.contains("Reviews")
      .should("be.visible");
  });


  it("should display correct doctor information", () => {

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

    cy.contains("Specialization")
      .should("be.visible");

    cy.contains("Children")
      .should("be.visible");

    cy.contains("Region")
      .should("be.visible");

    cy.contains("Hebron")
      .should("be.visible");
  });


  it("should display the reviews section", () => {

    cy.get('button[title="Overview"]')
      .first()
      .click();

    cy.contains("Reviews")
      .should("be.visible");

    cy.get("table")
      .should("be.visible");
  });


  it("should display review table headers", () => {

    cy.get('button[title="Overview"]')
      .first()
      .click();

    cy.contains("Date")
      .should("be.visible");

    cy.contains("Rating")
      .should("be.visible");

    cy.contains("Notes")
      .should("be.visible");
  });


  it("should return to doctors page using the back button", () => {

    cy.get('button[title="Overview"]')
      .first()
      .click();

    cy.url()
      .should("include", "/doctor/");

    cy.get(".back-button")
      .click();

    cy.url()
      .should("include", "/doctors");
  });

});