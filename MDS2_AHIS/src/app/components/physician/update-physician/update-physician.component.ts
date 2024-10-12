/**
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * Represents a update physician component for physician feature
*/ 

import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToUpperCasePipe } from 'src/app/pipes/to-upper-case.pipe';
import { DateFormatPipe } from 'src/app/pipes/date-format.pipe';

@Component({
  selector: 'app-update-physician',
  templateUrl: './update-physician.component.html',
  styleUrls: ['./update-physician.component.css'],
  providers: [ToUpperCasePipe, DateFormatPipe]
})

export class UpdatePhysicianComponent {
  imageUrl: string = '../assets/images/banner-sample.png';
  physician_id: string | null = ""; 

  // Database
  physicianDB: any[] = [];
  
  // Details that can be updated
  newDepartment: string | null = ""; 

  /**
   * @constructor The constructor of this component has three dependencies: the DatabaseService, the ActivatedRoute, and the Router
   * @param dbService Service used to fetch and manage data from the database
   * @param router Service used for navigation between components/pages
   * @param route Provides information about the current route in the application
   */
  constructor(private dbService: DatabaseService, private route: ActivatedRoute, private router: Router){
    this.physician_id = this.route.snapshot.paramMap.get('physician_id');
    console.log("doctor id: ", this.physician_id)
  }

  /**
   * @function ngOnInit runs when the component is initiated
   * @description Fetches all physicians data from the database
   */
  ngOnInit() {
    this.dbService.getAllPhysician().subscribe((data: any) => {
      this.physicianDB = data;
    });
    console.log(this.physicianDB)
  }

  /**
   * @function selectPhysicianButton Navigates the user to the Display physician page, passing the physician ID as a parameter
   * @description Navigates the user to the Display physician page, passing the physician ID as a parameter
   * @param physician_id The ID of the selected physician
   */
  selectPhysicianButton(physician_id: string){
    this.physician_id = physician_id
  }

  /**
   * @function updateButton Sends the updated physician details to the DatabaseService for updating the database
   * @description Sends the updated physician details to the DatabaseService for updating the database
   * @summary Creates an object with the physician_id and updated department details and passes it to the update service
   */
  updateButton(){
    const obj = {
      physician_id: this.physician_id,
      department: this.newDepartment,
    }

    this.dbService.updatePhysician(obj).subscribe({
      next: (result) => {
        // Successful response
        console.log(obj)
        this.dbService.getAllPhysician().subscribe((data: any) => {
          this.physicianDB = data
        })
      },
      error: (error) => {
        // Error handling
        console.log(obj)
        console.error('Error:', error);
        this.router.navigate(['/invalid-data']);
      }
    })
  }
}
