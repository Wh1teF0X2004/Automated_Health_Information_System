/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
 * Represents a Add consultation component for consultation feature
*/ 

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

/**
 * @interface Consultation
 * @description Define the Consultation interface, which describes the structure of a Consultation object
 */
interface Consultation {
  physicianId: string;
  generalAppearance: string;
  temperature: string;
  height: string;
  weight: string;
  bloodPressure: string;
  breathingPattern: string;
  pupilReflexCondition: string;
  nerveReflexCondition: string;
  other: string;
  patientSymptom: string;
  patientId: string | null;
}

@Component({
  selector: 'app-add-consultation',
  templateUrl: './add-consultation.component.html',
  styleUrls: ['./add-consultation.component.css']
})

export class AddConsultationComponent {
  /**
   * @constructor The constructor of this component has three dependencies: the DatabaseService, the ActivatedRoute, and the Router
   * @param dbService Service used to fetch and manage data from the database
   * @param router Service used for navigation between components/pages
   * @param route Provides information about the current route in the application
   */
  constructor(private dbService: DatabaseService, private router: Router, private route: ActivatedRoute) { }

  // Generate new consultation object
  consultation: Consultation = {
    physicianId: "",
    patientId: "",
    generalAppearance: "",
    temperature: "",
    height: "",
    weight: "",
    bloodPressure: "",
    breathingPattern: "",
    pupilReflexCondition: "",
    nerveReflexCondition: "",
    other: "",
    patientSymptom: ""
  };

  id: string | null = "";
  appointmentId:  any = "";
  patientDB: any[] = [];
  aPatient: any = {};
  anAppointment: any = {};
  appointmentDB: any[] = [];
  physicianDB: any[] = [];
  aPhysician: any = {};

  /**
   * @function ngOnInit fetches appointment, patient, and physician data, and retrieves records for the selected appointment
   * @summary Fetches appointment, patient, and physician data, and retrieves records for the selected appointment
   * @description Fetches appointment, patient, and physician data, and retrieves records for the selected appointment
   */
  ngOnInit() {
    this.getAppointmentId();
    this.getAppointmentRecord();
    this.getPatientRecord();
    this.getPhysicianRecord();
  }

  /**
   * @function getAppointmentId function fetch the appointment ID from the route
   * @summary Fetch the appointment ID from the route for it to be access later
   * @description Fetch the appointment ID from the route for it to be access later
   */
  getAppointmentId(){
    this.route.paramMap.subscribe(params => {
      this.appointmentId = params.get('appointment_id');
      console.log("Get appointmentId to add consultation: ", this.appointmentId );
    })
  }

  /**
   * @function getAppointmentRecord function fetch the appointment records from the MongoDB database 
   * @summary Fetch the appointment records from the MongoDB database using the appointment ID and store it in a variable to be access later
   * @description Fetch the appointment records from the MongoDB database using the appointment ID and store it in a variable to be access later
   */
  getAppointmentRecord(){
    this.dbService.getAllAppointment().subscribe((appointmentDB: any) => {
      console.log("Get Appointment Id record",this.appointmentId)
      for (let app of appointmentDB){
        if (app.appointment_id === this.appointmentId) {
          this.anAppointment = app;
          console.log("appointment Record",this.anAppointment)
        }
      }
    });
  }

  /**
   * @function getPatientRecord function fetch the Patient records from the MongoDB database 
   * @summary Fetch the Patient records from the MongoDB database using the consultation object and store it in a variable to be access later
   * @description Fetch the Patient records from the MongoDB database using the consultation object and store it in a variable to be access later
   */
  getPatientRecord(){
    this.dbService.getPatients().subscribe((patientDB: any) => {
      this.consultation.patientId = this.anAppointment.patient_id;
      console.log("Get Patient Id record",this.consultation.patientId)
      for (let patient of patientDB){
        if (patient.patientId === this.consultation.patientId) {
          this.aPatient = patient;
          console.log("Patient Record",this.aPatient)
        }
      }
    });
  }

  /**
   * @function getPhysicianRecord function fetch the Physician records from the MongoDB database 
   * @summary Fetch the Physician records from the MongoDB database using the consultation object and store it in a variable to be access later
   * @description Fetch the Physician records from the MongoDB database using the consultation object and store it in a variable to be access later
   */
  getPhysicianRecord(){
    // Fetch physicians from database and format their names for the dropdown
    this.dbService.getAllPhysician().subscribe((physicianDB: any) => {
      this.consultation.physicianId = this.anAppointment.physician_id;
      for (let dr of physicianDB){
        if (dr.physician_id === this.consultation.physicianId) {
          this.aPhysician = dr;
          console.log("physician Record",this.aPhysician)
        }
      }
    });
  }

  /** 
   * @function addConsultation function passes consultation object to the service to be sent to the server via a post request.
   * @summary A consultation object is created based on the form inputs and is submitted to be stored in the MongoDB database.
   * @description onSubmit is triggered when the html form is submitted and the consultation object is created and sent to the DatabaseService to add it to the MongoDB database.
  */
  addConsultation() {
    this.dbService.insertConsultation(this.consultation).subscribe({
      // uses the router service to redirect the client to another component. 
      // In other words, replace the current component with another one.
      next: (result) => {
        this.dbService.deleteAppointmentById(this.appointmentId).subscribe(() => {
          this.router.navigate(["/list-consultation"])
        })
      },
      error: (error) => { 
        console.log('Error:', error);
        this.router.navigate(["/invalid-data"])}     
     })      
  }

}
