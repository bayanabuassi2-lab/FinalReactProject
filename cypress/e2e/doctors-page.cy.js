describe("Doctors Page", () => {

  beforeEach(() => {
    cy.visit("http://localhost:3000/doctors");
  });


  it("should open the doctors page successfully", () => {
    cy.contains("Doctors")
      .should("be.visible");
  });


  it("should display all search fields and button", () => {
    cy.get('input[placeholder="Type doctor name"]')
      .should("be.visible");

    cy.get('input[placeholder="Choose specialization"]')
      .should("be.visible");

    cy.get('input[placeholder="Choose region"]')
      .should("be.visible");

    cy.contains("Search")
      .should("be.visible");
  });


  it("should display the doctors table correctly", () => {
    cy.get("table")
      .should("be.visible");

    cy.contains("Name")
      .should("be.visible");

    cy.contains("Specialization")
      .should("be.visible");

    cy.contains("Region")
      .should("be.visible");

    cy.contains("Actions")
      .should("be.visible");
  });


  it("should display doctors with Overview and Review buttons", () => {
    cy.get("tbody tr")
      .should("have.length.at.least", 1);

    cy.get('button[title="Overview"]')
      .should("have.length.at.least", 1);

    cy.get('button[title="Review"]')
      .should("have.length.at.least", 1);
  });

});