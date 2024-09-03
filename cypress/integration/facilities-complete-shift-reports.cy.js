import facilityUser from '../../fixtures/users/facilities.json';
import FacilityModel from '../../support/model/facility';
import clinicianUsers from '../../fixtures/users/clinicians.json';
import SetDate from '../../support/model/shift-time';
import page from '../../fixtures/pages-name.json';
import moment from 'moment-timezone';

describe('As a Facility, I want to be able to complete my shift report after the Clinician finished his shift', () => {
  const clinican = clinicianUsers.default;
  const facility = facilityUser.default;
  const facilityMessage = FacilityModel.getNewFacility();
  const shiftDate = SetDate.addDay();
  const license = 'RN';
  const startShift = SetDate.addMinutes(0);
  const endShift = SetDate.addMinutes(1);
  const getCalendarDay = SetDate.getDay();
  const shiftId = Cypress.env('facilityPayLoad').shiftId;
  const clinicianFullName = clinican.fullName;
  let tokenFacility;
  let tokenClinician;
  let jobId;
  let userId;
  const shiftWelcome = `${clinicianFullName} finished the shift!`;
  const question = `How was your experience with the shift with ${clinicianFullName}?`;
  const endPageTitle = `Thank you for submitting shift report for ${clinicianFullName}`;
  const shiftReportWelcomeUrl = '/shift-report/welcome';
  const shiftReportFormUrl = '/shift-report/form';
  const shiftReportRatingUrl = '/shift-report/rating';
  const shiftReportEndUrl = '/shift-report/end';

  beforeEach(() => {
    indexedDB.deleteDatabase('firebaseLocalStorageDb'); // Clearing saved login session
  });

  it('Create a Pre-Condition: Facility Post a Shif, Clinician Request Shift, Facility accept the shift, Clinician arrived on local, Clinician start the shift, Clinician finish the shift', () => {
    //--post shift as a Facitily user
    cy.loginApiToken(facility.email, facility.password).then((response) => {
      tokenFacility = response.body.idToken;

      cy.postOneJob(
        tokenFacility,
        license,
        facilityMessage.jobDescription,
        shiftDate,
        startShift,
        endShift
      ).then((response) => {
        jobId = response.body[0].job_id;
      });
    });

    //--Request shift as a Clinician user
    cy.loginApiToken(clinican.email, clinican.password).then((response) => {
      tokenClinician = response.body.idToken;
      cy.clinicianRequestJob(tokenClinician, jobId);
    });

    //--Get Clinician User ID
    cy.apiLogin(clinican.email, clinican.password).then((response) => {
      userId = response.body.userData.userId;
    });

    //-- Facility Accept the clinician request
    cy.loginApiToken(facility.email, facility.password).then((response) => {
      tokenFacility = response.body.idToken;
      cy.facilityAcceptOneJob(tokenFacility, jobId, userId).then((response) => {
        response.status;
      });
    });

    //-- Clinician Finish Shift
    cy.loginApiToken(clinican.email, clinican.password).then((response) => {
      console.log(userId);
      console.log(response.body.idToken);
      const token = response.body.idToken;

      //-- Clinican arrived at Facility
      cy.clinicianConfirmShift(token, jobId, shiftId, 2)
        .then((response) => {
          response.status;
        })
        .then(() => {
          cy.wait(5000);
          //-- Clinican start Shift
          cy.clinicianConfirmShift(token, jobId, shiftId, 3).then((response) => {
            response.status;
          });
          cy.wait(62000);

          cy.clinicianFinishedJob(
            token,
            jobId,
            shiftId,
            userId,
            shiftDate,
            startShift,
            endShift
          ).then((response) => {
            response.status;
            console.log(response);
            console.log(response.status);
          });
        });
    });
  });

  it('Facilities can complete their shift reports', () => {
    cy.visit(`/login`);
    cy.newLogin(facility.email, facility.password);

    cy.openMenu();
    cy.enterOnPage(page.schedule);

    cy.selectDayOnCalendar(getCalendarDay);

    cy.contains('ion-card', `${startShift} - ${endShift}`).first().click({ multiple: true });

    cy.validatePageText('.middle-col', `${startShift} - ${endShift}`);
    cy.clickShiftButton();

    cy.checkUrl(shiftReportWelcomeUrl);
    cy.validatePageText('.ion-padding-top', shiftWelcome);
    cy.containsAndClick('VERIFY DETAILS');

    cy.checkUrl(shiftReportFormUrl);
    cy.clickButton('[data-selector="shift-report_shift-form_button_continue"]');
    cy.validatePageText('.alert-wrapper', 'Are you sure you want to');
    cy.clickButton('.alert-button-role-ok');

    cy.checkUrl(shiftReportRatingUrl);
    cy.validatePageText('.header', question);
    cy.get('lib-star-rating').find('[star]').last().click({ force: true });
    cy.pressDeadPixel();
    cy.clickLastButton('[data-selector="shift-report_shift-form_button_cancel"]');

    cy.checkUrl(shiftReportEndUrl);
    cy.validatePageText('.ion-padding-top', endPageTitle);
    cy.waitModal();
    cy.containsAndClick('OK');
    cy.validatePageTextNoVisible('.jobs-details-text-style', `Completed`);
  });
});
