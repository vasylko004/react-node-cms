// @flow
export type Patterns = {
    email: RegExp,
    phone: RegExp,
    numbers: RegExp,
    min: (value: number)=>RegExp,
    max: (value: number)=>RegExp,
    names: RegExp
}

type ValidatorMessages = {
    IncorrectMail: string,
    IncorrectPhone: string,
    incorectType: string,
    stringTooShort: string,
    stringTooLong: string,
    numberTooSmall: string,
    numberTooBig: string,
    arrayTooShort: string,
    arrayTooLong: string,
    dateIsEarly: string,
    dateIsLate: string
}

export const MESSAGES: ValidatorMessages = {
    IncorrectMail: "Incorrect email format",
    IncorrectPhone: "Incorrect phone format",
    incorectType: "Incorrect field type",
    stringTooShort: "[field] is too short, min length needs to be [option] symbols",
    stringTooLong: "[filed] is too long, max length needs to be [option] symbols",
    numberTooSmall: "[filed] is too small, need to be more than [option]",
    numberTooBig: "[field] is too big, need to be less than [option]",
    arrayTooShort: "[filed] has not enough elements, need to have more than [option]",
    arrayTooLong: "[field] has to a lot, need to be less than [option]",
    dateIsEarly: "[field] date is early, need to be after [option]",
    dateIsLate: "[field] date is late, need to be till [option]"
}

export const IS_VALID_STATE = {
    Inactive: 0,
    Valid: 1,
    notValid: 2
}

export type ValidatorPattern = {
    pattern: RegExp | null,
    message: string,
    type: "string" | "number" | "boolean" | "array" | "file" | "date",
    isValid: 0 | 1 | 2,
    min: number | null,
    max: number | null
}

export type ValidationResp = {
    result: boolean, 
    errorMessage?: string 
}

export class Validations {

    patterns: { [string]: RegExp } = {
        email: /^[\w._-]+[+.]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/g,
        phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
        numbers: /[0-9]+/g
    }

    messages: ValidatorMessages

    constructor(options: { messages?: ValidatorMessages }){
        if(typeof options === 'undefined') options = {};
        this.messages = options.messages || MESSAGES;
    }

    set(params: string): ValidatorPattern {
        let listParams: Array<string> = params.split("|");
        
        let pattern: ValidatorPattern = {
            pattern: null,
            message: '',
            type: "string",
            isValid: 0,
            min: null,
            max: null
        }

        for (let i = 0; i < listParams.length; i++) {
            let _temp = listParams[i].split(":")
            let param = _temp[0];
            let option = _temp[1];


            switch(param){
                // < RegExp 
                case 'email':
                    pattern.pattern = this.patterns.email;
                    pattern.message = this.messages.IncorrectMail;
                break;
                case 'phone':
                    pattern.pattern = this.patterns.phone;
                    pattern.message = this.messages.IncorrectPhone;
                break;
                // RegExp >
                // < min - max options
                case 'min':
                    pattern.min = parseInt(option);
                break;
                case 'max':
                    pattern.max = parseInt(option);
                break;
                // min - max options >
                // < type setting
                case 'numbers':
                    pattern.type = "number";
                break;
                case 'boolean': 
                    pattern.type = "boolean";
                break;
                case 'date':
                    pattern.type = "date";
                break; 
                case "file":
                    pattern.type = "file";
                break;
                // type setting >
                default:
                break;
            }
            
        }

        return pattern;
    }

    checkMinMax(pattern: ValidatorPattern): {[key: string]: (value: any) => ValidationResp } {
        return {
            string: (value) => {
                let resp = { result: true };
                if(typeof value === 'string') {
                    if(typeof pattern.min === 'number' ) {
                       if( value.length < pattern.min ) {
                            resp = {
                                result: false,
                                errorMessage: this.messages.stringTooShort.replace("[option]",  pattern.min.toString() )
                            }
                       } 
                    } 

                    if (typeof pattern.max === 'number') {
                        if (value.length > pattern.max) {
                            resp = {
                                result: false,
                                errorMessage: this.messages.stringTooLong.replace("[option]", pattern.max.toString() )
                            }
                        }
                    }
                }
                return resp;
            },
            number: (value) => {
                let resp = { result: true };
                if (typeof value === "number") {
                    if(typeof pattern.min === 'number' ) {
                        if (value < pattern.min) {
                            return { 
                                result: false, 
                                errorMessage: this.messages.numberTooSmall.replace("[option]", pattern.min.toString() )
                            }
                        }
                    }
                    
                    if (typeof pattern.max === 'number') {
                        if (value > pattern.max) {
                            return {
                                result: false,
                                errorMessage: this.messages.numberTooBig.replace("[option]", pattern.max.toString() )
                            }
                        }
                    }
                }
                return resp;
            },
            array: (value) => {
                let resp = { result: true };
                
                if (typeof pattern.min === 'number') {
                    if (value.length < pattern.min) {
                        return {
                            result: false,
                            errorMessage: this.messages.arrayTooShort.replace("[option]",  pattern.min.toString() )
                        }
                    }
                }

                if (typeof pattern.max === 'number') {
                    if (value.length > pattern.max) {
                        return {
                            result: false,
                            errorMessage: this.messages.arrayTooLong.replace("[option]", pattern.max.toString() )
                        }
                    }
                }

                return resp;
            },
            date: (value) => {
                let resp = { result: true };

                if (typeof pattern.min === 'number') {
                    if (value.getTime() < pattern.min) {
                        return { 
                            result: false, 
                            errorMessage: this.messages.dateIsEarly.replace("[option]", new Date(pattern.min).toString() )
                        }
                    }
                }

                if (typeof pattern.max === 'number') {
                    if (value.getTime() > pattern.max) {
                        return {
                            result: false,
                            errorMessage: this.messages.dateIsLate.replace("[option]", new Date(pattern.max).toString() )
                        }
                    }
                }

                return resp;
            }
        }    
    }

    validate(value: string | number | boolean | Date | File, pattern: ValidatorPattern ): ValidationResp {
        // type checking
        if(typeof value !== (pattern.type: string) && !( (pattern.type === 'array' || pattern.type === 'date') && typeof value === 'object' )) {
            return {
                result: false,
                errorMessage: this.messages.incorectType
            }
        }

        if (typeof value === 'string' && pattern.pattern){
            // RegExp checking
            let checking = pattern.pattern.test(value);
            
            if (!checking) {
                
                return {
                    result: false,
                    errorMessage: pattern.message
                }
            }
        }

        let resp = {
            result: true
        }
        // min - max checking
        switch(pattern.type){
            case "string":
                resp = this.checkMinMax(pattern).string(value);
                if(!resp.result) return resp;
            break;
            case "number": 
                resp = this.checkMinMax(pattern).number(value);
                if(!resp.result) return resp;                
            break;
            case "array":
                if (typeof value === 'object') {
                    resp = this.checkMinMax(pattern).array(value);
                    if(!resp.result) return resp;                    
                }
            break;
            case "date":
                if (typeof value === 'object') {
                    resp = this.checkMinMax(pattern).date(value);
                    if(!resp.result) return resp;                    
                }
            break;
            default:
            break;
        }

        return resp;
    }
}