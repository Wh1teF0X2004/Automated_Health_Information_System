import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Define HTTP options with JSON content type for requests
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

// Injectable decorator to make the service available throughout the app
@Injectable({
  providedIn: 'root'
})

/**
 * The main benefit of having a service is to organize and share methods, models, or data with different components of an Angular application. 
 * This Database Service is responsible for the communication with the RESTFul server.  
*/
export class DatabaseService {

  // Inject HttpClient to make HTTP requests
  constructor(private http: HttpClient) { }

  /**
   * Patient
   * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
  */ 
  insertPatient(aPatient: any){
    return this.http.post("/patient/add", aPatient, httpOptions);
  }

  getPatients(){
    return this.http.get("/patient/list-patients", httpOptions);
  }

  deletePatient(patientId: string){
    console.log("Database service delete patient is invoked", patientId);
    return this.http.delete("/patient/delete-patient", {body: {patientId: patientId}, ...httpOptions});
  }

  updatePatient(aPatient: any){
    console.log("Database service update patient is invoked", aPatient)
    return this.http.put("/patient/update-patient", aPatient, httpOptions);
  }

  getJsonData(){
    return this.http.get("/patient_data.json");
  }

  /**
   * Consultation
   * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
  */ 
  insertConsultation(aConsultation: any){
    console.log("Database service add consultation is invoked", aConsultation)
      return this.http.post("/consultation/add", aConsultation, httpOptions);
  }

  getConsultations(){
    return this.http.get("/consultation/list-consultation", httpOptions);
  }

  deleteConsultation(consultationId: string){
    console.log("Database service delete consultation is invoked", consultationId)
    return this.http.delete("/consultation/delete-consultation", {body: {consultationId: consultationId}, ...httpOptions});
  }

  updateConsultation(aConsultation: any){
    console.log("Database service update patient is invoked", aConsultation)
    return this.http.put("/consultation/update-consultation", aConsultation, httpOptions);
  }

  /**
   * Diagnosis
   * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
  */ 
  insertDiagnosis(aDiagnosis: any){
    console.log("Database service add Diagnosis is invoked", aDiagnosis)
      return this.http.post("/diagnosis/add", aDiagnosis, httpOptions);
  }

  getDiagnosis(){
    return this.http.get("/diagnosis/list-diagnosis", httpOptions);
  }

  deleteDiagnosis(diagnosisId: string){
    console.log("Database service delete Diagnosis is invoked", diagnosisId)
    return this.http.delete("/diagnosis/delete-diagnosis", {body: {diagnosisId: diagnosisId}, ...httpOptions});
  }

  updateDiagnosis(aDiagnosis: any){
    console.log("Database service update Diagnosis is invoked", aDiagnosis)
    return this.http.put("/diagnosis/update-diagnosis", aDiagnosis, httpOptions);
  }

   /**
   * Login
   * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
  */ 
   loginService(logObj: any){
    console.log("Database service add login is invoked", logObj)
      return this.http.post("/auth/login", logObj, httpOptions);
  }

  authService(validateObj: any){
    console.log("Database service add auth is invoked", validateObj)
      return this.http.post("/auth/authenticate", validateObj, httpOptions);
  }

  /**
   * Register
   * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
  */ 
  registerService(registerObj: any){
    console.log("Database service add register is invoked", registerObj)
      return this.http.post("/auth/register", registerObj, httpOptions);
  }

  /**
   * Medication
   * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
  */ 
  addMedication(data: object){
    return this.http.post("/medication", data, httpOptions);
  }

  deleteMedicationById(medication_id: string) {
    return this.http.delete("/medication", { body: {medication_id: medication_id}, ...httpOptions });
  }

  getAllMedication(){
    return this.http.get("/medication", httpOptions);
  }

  updateMedication(data: object) {
    return this.http.put("/medication", data, httpOptions);
  }

  /**
   * Prescription
   * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
  */ 
  addPrescription(data: object){
    return this.http.post("/prescription", data, httpOptions);
  }

  deletePrescriptionById(prescription_id: string) {
    return this.http.delete("/prescription", { body: {prescription_id: prescription_id}, ...httpOptions });
  }

  getAllPrescription(){
    return this.http.get("/prescription", httpOptions);
  }

  updatePrescription(data: object) {
    return this.http.put("/prescription", data, httpOptions);
  }

  /**
   * Appointment
   * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
  */ 
  addAppointment(data: object){
    return this.http.post("/appointment", data, httpOptions);
  }

  deleteAppointmentById(appointment_id: string) {
    return this.http.delete("/appointment", { body: {appointment_id: appointment_id}, ...httpOptions });
  }

  getAllAppointment(){
    return this.http.get("/appointment", httpOptions);
  }

  updateAppointment(data: object) {
    return this.http.put("/appointment", data, httpOptions);
  }

  /**
   * Physician/Doctor
   * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
  */ 
  addPhysician(data: object){
    return this.http.post("/physician", data, httpOptions);
  }

  deletePhysicianById(physician_id: string) {
    return this.http.delete("/physician", { body: {physician_id: physician_id}, ...httpOptions });
  }

  getAllPhysician(){
    return this.http.get("/physician", httpOptions);
  }

  updatePhysician(data: object) {
    return this.http.put("/physician", data, httpOptions);
  }

}
