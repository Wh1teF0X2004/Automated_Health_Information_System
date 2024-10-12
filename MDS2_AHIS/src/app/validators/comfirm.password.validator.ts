import { FormGroup } from "@angular/forms"

export const comfirmPasswordValidator = (controlName: string, controlNameToMatch: string)=>{
    return (formGroup: FormGroup)=>{
        let control = formGroup.controls[controlName];
        let controlToMatch = formGroup.controls[controlNameToMatch];
        if(controlToMatch.errors && !controlToMatch.errors['comfirmPasswordValidator']){
            return;
        }
        if(control.value !== controlToMatch.value){
            controlToMatch.setErrors({comfirmPasswordValidator: true});
        }else{
            controlToMatch.setErrors(null);
        }

    }
    
}