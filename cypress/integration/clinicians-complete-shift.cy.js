import facilityUser from '../../fixtures/users/facilities.json';
import FacilityModel from '../../support/model/facility';
import clinicianUsers from '../../fixtures/users/clinicians.json';
import SetDate from '../../support/model/shift-time';
import page from '../../fixtures/pages-name.json';
import moment from 'moment-timezone';

describe('As a Clinician, I want to be able to complete my shift', () => {
  const facilityMessage = FacilityModel.getNewFacility();
  const shiftDate = SetDate.addDay();
  const license = 'RN';
  const startShift = SetDate.addMinutes(0);
  const endShift = SetDate.addMinutes(1);
  const getCalendarDay = moment().tz('US/Arizona').format('MMMM DD, YYYY');
  const shiftId = Cypress.env('facilityPayLoad').shiftId;
  const facilityName = '00 E2e Automated Web Requested Job';
  const jobStatus = 'Clinician Shift Report';
  const clinican = clinicianUsers.default;
  const facility = facilityUser.default;
  const shiftReportWelcomeUrl = '/shift-report/welcome';
  const shiftReportFormUrl = '/shift-report/form';
  const shiftReportRatingUrl = '/shift-report/rating';
  const shiftReportRecommendedUrl = '/shift-report/recommended';
  const jobsUrl = `/jobs`;
  let tokenFacility;
  let tokenClinician;
  let jobId;
  let userId;

  beforeEach(() => {
    indexedDB.deleteDatabase('firebaseLocalStorageDb'); // Clearing saved login session
  });

  it('Create a Pre-Condition: Facility Post a Shif, Clinician Request Shift, Facility accept the shift, Clinician arrived on local, Clinician start the shift', () => {
    //--post job as a Facitily user
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
    //--Request job as a Clinician user
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

      cy.clinicianConfirmShift(token, jobId, shiftId, 2)
        .then((response) => {
          response.status;
        })
        .then(() => {
          cy.wait(5000);

          cy.clinicianConfirmShift(token, jobId, shiftId, 3).then((response) => {
            response.status;
          });

          cy.wait(63000);
        });
    });
  });

  it('Clinican can complete his shift', () => {
    cy.visit(`/login`);

    cy.newLogin(clinican.email, clinican.password);

    cy.openMenu();
    cy.enterOnPage(page.schedule);

    cy.validatePageText('[data-cy="header_title"]', 'Schedule');

    cy.clearFilterSchedulePage();

    cy.validatePageText('[data-cy="header_title"]', 'Schedule');

    cy.openFilter();
    cy.contains('Start Date').click({ force: true });
    cy.clickButton(`[aria-label='${getCalendarDay}']`);
    cy.clickLastButton('ion-fab-button');

    cy.openFilter();
    cy.contains('Shift Statuses').click({ force: true });
    cy.contains('SEE SHIFTS').should('exist');

    cy.clickFilterItem(jobStatus);
    cy.contains('APPLY').should('be.visible').click();

    cy.waitModal();
    cy.containsAndClick('SEE SHIFTS');

    cy.waitModal();

    cy.scrollUntilFindElementTextSchedulePage(startShift, endShift);

    cy.checkJobCardItemsAndClick(license, jobStatus, startShift, endShift);
    cy.clickShiftButton();

    cy.checkUrl(shiftReportWelcomeUrl);
    cy.validatePageText('.ion-padding-top', `Have you finished the shift?`);
    cy.containsAndClick('CONFIRM SHIFT REPORT');

    cy.checkUrl(shiftReportFormUrl);

    cy.validatePageText('.shift-title', `Please complete your shift report`);
    cy.validatePageText('.status-style', license).first();
    cy.validatePageText('.middle-col', `${startShift} - ${endShift}`);
    cy.validatePageText('.item-label', facilityName);

    cy.clickButton('[data-selector="shift-report_shift-form_button_continue"]');

    cy.waitModal();

    cy.url().then((url) => {
      console.log('Current URL is: ' + url);
      const boxUrl = `${Cypress.config().baseUrl}/shift-report/form`;
      console.log(boxUrl);
      if (url == boxUrl) {
        cy.clickLastButton('.alert-button');
      }
    });

    cy.checkUrl(shiftReportRatingUrl);
    cy.validatePageText('.header', `How was your experience with the shift in ${facilityName}?`);

    cy.get('lib-star-rating').find('[star]').last().click({ force: true });
    cy.clickLastButton('[data-selector="shift-report_shift-form_button_cancel"]');

    cy.checkUrl(shiftReportRecommendedUrl);
    cy.validatePageText('.ion-padding-top', `Successfully completed shift`);

    cy.containsAndClick('CONTINUE');

    cy.checkUrl(jobsUrl);
  });
});
