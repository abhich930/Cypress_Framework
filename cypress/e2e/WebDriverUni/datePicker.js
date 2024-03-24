/// <reference types='Cypress'/>
import HomePage from "../../support/pom/wduni/Homepage_PO";

describe("working with the date pickers", () => {
  const home = new HomePage();

  before(() => {
    cy.fixture("ProtoCommereceTestData").then((data) => {
      globalThis.data = data;
    });
    cy.fixture("targets").then((testData) => {
      globalThis.testData = testData;
    });
  });

  beforeEach(() => {
    home.VisitHome();
    home.click_on_desired_page(testData.date);
  });

  it("Datepickers", () => {
    let desiredYear = String(data.year);
    let desiredMonth = data.month;
    let desiredDay = String(data.day);
    let firstYear;
    let lastYear;
    cy.get(".input-group-addon").click();
    cy.get(".datepicker .datepicker-years table thead tr :nth-child(2)").click({
      force: true,
    });
    cy.get(".datepicker .datepicker-years table tbody tr td .year.old").then(
      ($refYear) => {
        firstYear = $refYear.text();
        cy.log(firstYear);
      }
    );
    cy.get(".datepicker .datepicker-years table tbody tr td .year.new").then(
      ($refYear1) => {
        lastYear = $refYear1.text();
        cy.log(lastYear);
      }
    );
    cy.get(".datepicker .datepicker-years table tbody tr td span")
      .invoke("show")
      .each(($year) => {
        const yearOnPicker = $year.text();
        if (yearOnPicker.includes(desiredYear)) {
          cy.wrap($year).click({ force: true });
        } else if (Number(desiredYear) < Number(firstYear)) {
          cy.get(
            ".datepicker .datepicker-years table thead tr :nth-child(1)"
          ).click({ force: true });
          cy.get(".datepicker .datepicker-years table tbody tr td span")
            .invoke("show")
            .each(($nyr) => {
              const prevy = $nyr.text();
              if (prevy.includes(desiredYear)) {
                cy.wrap($nyr).click({ force: true });
              }
            });
        } else if (Number(desiredYear) > Number(lastYear)) {
          cy.get(
            ".datepicker .datepicker-years table thead tr :nth-child(3)"
          ).click({ force: true });
          cy.get(".datepicker .datepicker-years table tbody tr td span")
            .invoke("show")
            .each(($nexyr) => {
              const ney = $nexyr.text();
              if (ney.includes(desiredYear)) {
                cy.wrap($nexyr).click({ force: true });
              }
            });
        }
      });
    cy.get(".datepicker .datepicker-months table tbody tr td span").each(
      ($mth) => {
        const monthOnDatePicker = $mth.text();
        if (monthOnDatePicker === desiredMonth) {
          cy.wrap($mth).click({ force: true });
        }
      }
    );
    cy.get(".datepicker-days table tbody tr td").each(($day) => {
      const dayOnDatePicker = $day.text();
      if (dayOnDatePicker === desiredDay) {
        cy.wrap($day).click({ force: true });
      }
    });
    cy.get('.form-control[type="text"]')
      .invoke("val")
      .then((visibleDate) => {
        cy.log(visibleDate);
        expect(visibleDate).to.contain("09-22");
      });
  });
});
