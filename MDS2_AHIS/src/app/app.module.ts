/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
*/ 

// Angular core and platform modules
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

// Root component for bootstrapping the app
import { AppComponent } from './app.component';
// FormsModule is used for template-driven forms in Angular
import { FormsModule } from '@angular/forms';
// RouterModule and Routes define and manage the application's routes
import { RouterModule, Routes } from '@angular/router';
// PageNotFoundComponent handles invalid or non-existing routes
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
// DatabaseService is the main service for interacting with the database
import { DatabaseService } from './services/database.service';
// HttpClientModule is used to perform HTTP requests to a backend
import { HttpClientModule } from '@angular/common/http';
// Component to handle invalid data errors
import { InvalidDataErrorComponent } from './components/invalid-data-error/invalid-data-error.component';

// ServiceWorkerModule is used to enable Progressive Web App (PWA) functionality
import { ServiceWorkerModule } from '@angular/service-worker';

// Custom pipes for formatting dates, text, and calculating age
import { DateFormatPipe } from './pipes/date-format.pipe';
import { ToUpperCasePipe } from './pipes/to-upper-case.pipe';
import { CalculateAgePipe } from './pipes/calculate-age.pipe';
import { DateTimeFormatPipe } from './pipes/date-time-format.pipe';

// Main components for the application
import { HomepageComponent } from './components/homepage/homepage.component';

// Components related to managing patients
import { AddPatientComponent } from './components/patient/add-patient/add-patient.component';
import { ListPatientComponent } from './components/patient/list-patient/list-patient.component';
import { UpdatePatientComponent } from './components/patient/update-patient/update-patient.component';
import { ViewPatientComponent } from './components/patient/view-patient/view-patient.component';

// Components related to managing medications
import { AddMedicationComponent } from './components/medication/add-medication/add-medication.component';
import { ListMedicationComponent } from './components/medication/list-medication/list-medication.component';
import { UpdateMedicationComponent } from './components/medication/update-medication/update-medication.component';
import { DisplayMedicationComponent } from './components/medication/display-medication/display-medication.component';

// Components related to managing prescriptions
import { AddPrescriptionComponent } from './components/prescription/add-prescription/add-prescription.component';
import { ListPrescriptionComponent } from './components/prescription/list-prescription/list-prescription.component';
import { UpdatePrescriptionComponent } from './components/prescription/update-prescription/update-prescription.component';
import { DisplayPrescriptionComponent } from './components/prescription/display-prescription/display-prescription.component';

// Components related to managing appointments
import { AddAppointmentComponent } from './components/appointment/add-appointment/add-appointment.component';
import { ListAppointmentComponent } from './components/appointment/list-appointment/list-appointment.component';
import { DisplayAppointmentComponent } from './components/appointment/display-appointment/display-appointment.component';
import { UpdateAppointmentComponent } from './components/appointment/update-appointment/update-appointment.component';

// Components related to managing physicians
import { AddPhysicianComponent } from './components/physician/add-physician/add-physician.component';
import { ListPhysicianComponent } from './components/physician/list-physician/list-physician.component';
import { DisplayPhysicianComponent } from './components/physician/display-physician/display-physician.component';
import { UpdatePhysicianComponent } from './components/physician/update-physician/update-physician.component';

// Components related to managing consultations
import { AddConsultationComponent } from './components/consultation/add-consultation/add-consultation.component';
import { ListConsultationComponent } from './components/consultation/list-consultation/list-consultation.component';
import { UpdateConsultationComponent } from './components/consultation/update-consultation/update-consultation.component';
import { ViewConsultationComponent } from './components/consultation/view-consultation/view-consultation.component';

// Components related to managing diagnoses
import { AddDiagnosisComponent } from './components/diagnosis/add-diagnosis/add-diagnosis.component';
import { ListDiagnosisComponent } from './components/diagnosis/list-diagnosis/list-diagnosis.component';
import { UpdateDiagnosisComponent } from './components/diagnosis/update-diagnosis/update-diagnosis.component';
import { ViewDiagnosisComponent } from './components/diagnosis/view-diagnosis/view-diagnosis.component';

// Components related to login and register
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ValidateAdminComponent } from './components/register/validate-admin/validate-admin.component';

// Define application routes
const routes: Routes = [
  { path: 'add-patient', component: AddPatientComponent }, // Route for adding a patient
  { path: 'list-patients', component: ListPatientComponent }, // Route for listing patients
  { path: 'invalid-data', component: InvalidDataErrorComponent }, // Route for showing invalid data errors
  { path: 'view-patient/:patientId', component: ViewPatientComponent }, // Route for viewing a patient with dynamic patientId
  { path: 'update-patient/:patientId', component: UpdatePatientComponent }, // Route for updating a patient with dynamic patientId
  { path: 'add-medication', component: AddMedicationComponent }, // Route for adding medication
  { path: 'list-medication', component: ListMedicationComponent }, // Route for listing medications
  { path: 'display-medication/:medication_id', component: DisplayMedicationComponent }, // Route for displaying a specific medication
  { path: 'update-medication/:medication_id', component: UpdateMedicationComponent }, // Route for updating medication with dynamic medication_id
  { path: 'add-prescription/:diagnosisId', component: AddPrescriptionComponent }, // Route for adding a prescription tied to a diagnosisId
  { path: 'list-prescription', component: ListPrescriptionComponent }, // Route for listing prescriptions
  { path: 'display-prescription/:prescription_id', component: DisplayPrescriptionComponent }, // Route for displaying a specific prescription
  { path: 'update-prescription/:prescription_id', component: UpdatePrescriptionComponent }, // Route for updating a prescription
  { path: 'add-appointment', component: AddAppointmentComponent }, // Route for adding an appointment
  { path: 'list-appointment', component: ListAppointmentComponent }, // Route for listing appointments
  { path: 'display-appointment/:appointment_id', component: DisplayAppointmentComponent }, // Route for displaying a specific appointment
  { path: 'update-appointment/:appointment_id', component: UpdateAppointmentComponent }, // Route for updating an appointment
  { path: 'add-physician', component: AddPhysicianComponent }, // Route for adding a physician
  { path: 'list-physician', component: ListPhysicianComponent }, // Route for listing physicians
  { path: 'display-physician/:physician_id', component: DisplayPhysicianComponent }, // Route for displaying a specific physician
  { path: 'update-physician/:physician_id', component: UpdatePhysicianComponent }, // Route for updating a physician
  { path: 'start-consultation/:appointment_id', component: AddConsultationComponent }, // Route for starting a consultation tied to an appointment
  { path: 'list-consultation', component: ListConsultationComponent }, // Route for listing consultations
  { path: 'update-consultation/:consultationId', component: UpdateConsultationComponent }, // Route for updating a consultation
  { path: 'view-consultation/:consultationId', component: ViewConsultationComponent }, // Route for viewing a specific consultation
  { path: 'add-diagnosis/:consultationId', component: AddDiagnosisComponent }, // Route for adding a diagnosis tied to a consultation
  { path: 'list-diagnosis', component: ListDiagnosisComponent }, // Route for listing diagnoses
  { path: 'update-diagnosis/:diagnosisId', component: UpdateDiagnosisComponent }, // Route for updating a diagnosis
  { path: 'view-diagnosis/:diagnosisId', component: ViewDiagnosisComponent }, // Route for viewing a diagnosis
  { path: 'login', component: LoginComponent }, // Route for login page
  { path: 'register', component: RegisterComponent }, // Route for register page
  { path: 'admin-authentication', component: ValidateAdminComponent}, // Route for admin authentication page
  { path: "home", component: HomepageComponent }, // Route to the homepage
  { path: '', pathMatch: 'full', component: LoginComponent }, // Default route to the login page
  { path: '**', component: PageNotFoundComponent } // Wildcard route for undefined paths
]

@NgModule({
  declarations: [
    AppComponent, // Root component
    AddPatientComponent, // Component for adding a patient
    ListPatientComponent, // Component for listing patients
    PageNotFoundComponent, // Component for 404 errors
    AddMedicationComponent, // Component for adding medication
    ListMedicationComponent, // Component for listing medications
    UpdateMedicationComponent, // Component for updating medication
    InvalidDataErrorComponent, // Component for handling invalid data errors
    ViewPatientComponent, // Component for viewing a patient
    HomepageComponent, // Component for the homepage
    UpdatePatientComponent, // Component for updating a patient
    DisplayMedicationComponent, // Component for displaying medication details
    DateFormatPipe, // Pipe for formatting dates
    ToUpperCasePipe, // Pipe for converting text to uppercase
    AddPrescriptionComponent, // Component for adding a prescription
    ListPrescriptionComponent, // Component for listing prescriptions
    UpdatePrescriptionComponent, // Component for updating a prescription
    DisplayPrescriptionComponent, // Component for displaying a prescription
    CalculateAgePipe, // Pipe for calculating age
    DateTimeFormatPipe, // Pipe for formatting date and time
    AddAppointmentComponent, // Component for adding an appointment
    ListAppointmentComponent, // Component for listing appointments
    DisplayAppointmentComponent, // Component for displaying appointment details
    UpdateAppointmentComponent, // Component for updating an appointment
    AddPhysicianComponent, // Component for adding a physician
    ListPhysicianComponent, // Component for listing physicians
    UpdatePhysicianComponent, // Component for updating a physician
    DisplayPhysicianComponent, // Component for displaying physician details
    AddConsultationComponent, // Component for adding a consultation
    ListConsultationComponent, // Component for listing consultations
    UpdateConsultationComponent, // Component for updating a consultation
    ViewConsultationComponent, // Component for viewing consultation details
    AddDiagnosisComponent, // Component for adding a diagnosis
    ListDiagnosisComponent, // Component for listing diagnoses
    UpdateDiagnosisComponent, // Component for updating a diagnosis
    ViewDiagnosisComponent, // Component for viewing diagnosis details
    LoginComponent, RegisterComponent, ValidateAdminComponent, // Component for login and register
  ],
  imports: [
    BrowserModule, // Import required for running the app in a browser
    FormsModule, // Import required for working with template-driven forms
    RouterModule.forRoot(routes, {useHash: true}), // Import and configure the router
    HttpClientModule, // Import for performing HTTP requests
    ServiceWorkerModule.register('ngsw-worker.js', { // Register the service worker for PWA support
      enabled: !isDevMode(), // Enable service worker only in production mode
      registrationStrategy: 'registerWhenStable:30000' // Register service worker when app is stable or after 30 seconds
    }),
    ReactiveFormsModule
  ],
  providers: [DatabaseService], // Provide the database service globally
  bootstrap: [AppComponent] // Specify the root component to bootstrap
})

export class AppModule { }
