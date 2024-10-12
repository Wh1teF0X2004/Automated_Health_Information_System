/**
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * Represents a display physician component for physician feature
*/ 

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { ToUpperCasePipe } from 'src/app/pipes/to-upper-case.pipe';
import { DateFormatPipe } from 'src/app/pipes/date-format.pipe';

@Component({
  selector: 'app-display-physician',
  templateUrl: './display-physician.component.html',
  styleUrls: ['./display-physician.component.css'],
  providers: [ToUpperCasePipe, DateFormatPipe]
})

export class DisplayPhysicianComponent {
  imageUrl: string = '../assets/images/banner-sample.png';
  // Physician ID
  physician_id: string | null = ""; 
  objectId: string | null = ""; 
  // Physician Details
  physician_firstName: string = ""
  physician_lastName: string = ""
  birth_date: Date = new Date();
  department: string = ""
  // Database
  physicianDB: any[] = [];
  medicationDB: any[] = [];
  patientDB: any[] = [];
  prescriptionDB: any[] = [];

  /**
   * @constructor The constructor of this component has three dependencies: the DatabaseService, the ActivatedRoute, and the Router
   * @param dbService Service used to fetch and manage data from the database
   * @param router Service used for navigation between components/pages
   * @param route Provides information about the current route in the application
   */
  constructor(private dbService: DatabaseService, private route: ActivatedRoute, private router: Router) {
    this.physician_id = this.route.snapshot.paramMap.get('physician_id');
    console.log("doctor id: ", this.physician_id)
  }

  /**
   * @function ngOnInit runs when the component is initiated
   * @description Fetches the matching physician data by a specific physician ID by calling the database
   */
  ngOnInit(){
    this.dbService.getAllPhysician().subscribe((data: any) => {
      if (data && data.length > 0) {
        const matchingPhysician = data.find((doc: any) => doc.physician_id === this.physician_id);
        console.log("FOUND matching physician: ", matchingPhysician)
        if (matchingPhysician) {
          this.objectId = matchingPhysician._id
          this.physician_id = matchingPhysician.physician_id
          this.physician_firstName = matchingPhysician.physician_firstName
          this.physician_lastName = matchingPhysician.physician_lastName
          this.birth_date = matchingPhysician.birth_date
          this.department = matchingPhysician.department
        } else {
          this.router.navigate(['/invalid-data']);
        }
      }
      else {
        this.router.navigate(['/invalid-data']);
      }
    })
  }
}
