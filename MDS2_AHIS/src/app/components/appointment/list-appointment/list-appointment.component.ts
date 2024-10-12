/**
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * Represents a list all appointment component for appointment feature
*/ 

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { ToUpperCasePipe } from 'src/app/pipes/to-upper-case.pipe';
import { DateFormatPipe } from 'src/app/pipes/date-format.pipe';
import { DateTimeFormatPipe } from 'src/app/pipes/date-time-format.pipe';

@Component({
  selector: 'app-list-appointment',
  templateUrl: './list-appointment.component.html',
  styleUrls: ['./list-appointment.component.css'],
  providers: [ToUpperCasePipe, DateFormatPipe, DateTimeFormatPipe]
})

export class ListAppointmentComponent {
  imageUrl: string = '../assets/images/banner-sample.png';
  appointmentDB: any[] = [];
  patientDB: any[] = [];
  doctorDB: any[] = [];

  /**
   * @constructor The constructor of this component has two dependencies: the DatabaseService and the Router
   * @param dbService Service used to fetch and manage data from the database
   * @param router Service used for navigation between components/pages
   */
  constructor(private dbService: DatabaseService, private router: Router) {}

  /**
   * @function onClick Logs the current appointmentDB to the console
   * @summary Logs the current appointmentDB to the console
   * @description This is mainly for debugging purposes to verify that the database has been populated
   */
  onClick() {
    console.log(this.appointmentDB);
  }

  /**
   * @function onDelete deletes a appointment record from the database based on the appointment ID
   * @param id The ID of the appointment to be deleted/removed from database
   * @description After successful deletion, it re-fetches the updated list of appointment from the database so the update/action is shown immediately
   */
  onDelete(id: string) {
    this.dbService.deleteAppointmentById(id).subscribe(() => {
      this.dbService.getAllAppointment().subscribe((data: any) => {
        this.appointmentDB = data;
      });
    });
  }

  /**
   * @function ngOnInit fetches the list of all appointment from the database and assigns it to appointmentDB
   */
  ngOnInit() {
    this.dbService.getAllAppointment().subscribe((data: any) => {
      this.appointmentDB = data;
    });
    console.log(this.appointmentDB)
  }

  /**
   * @function getPatientDatabase function fetch the patient records from the MongoDB database
   * @summary Fetch the patient records from the MongoDB database and store it in a variable to be access later
   * @description Fetch the patient records from the MongoDB database and store it in a variable to be access later
   */
  getPatientDatabase() {
    this.dbService.getPatients().subscribe((data: any) => {
      this.patientDB = data;
    });
  }

  /**
   * @function getDoctorDatabase function fetch the physician records from the MongoDB database
   * @summary Fetch the physician records from the MongoDB database and store it in a variable to be access later
   * @description Fetch the physician records from the MongoDB database and store it in a variable to be access later
   */
  getDoctorDatabase() {
    this.dbService.getAllPhysician().subscribe((data: any) => {
      this.doctorDB = data;
    });
  }
}
