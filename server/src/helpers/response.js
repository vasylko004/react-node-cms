// @flow
export const SUCCESS:number = 200;
export const CREATED:number = 201;
export const NOT_MODIFIED:number = 304;
export const BAD_REQUEST:number = 400;
export const UNAUTH:number = 401;
export const FORBIDDEN:number = 403;
export const NOT_FOUND:number = 404;
export const CONFLICT:number = 409;
export const SERVER_ERROR:number = 500;

export class Response {
    response:any;
    status:number;
    data: any;
    notice: Array<string>;
    warnings: Array<string>;
    errors: Array<string>;

    constructor(response: any){
        this.response = response;
        this.status = 200;
        this.data = null;
        this.notice = [];
        this.warnings = [];
        this.errors =  [];
    }

    addWarning(message:string) {
        this.warnings.push(message);
    }
    
    addNotice(message:string) {
       this.notice.push(message);
    }
    
    addError(code:number, message: string) {
        this.status = code;
        this.errors.push(message);
    }

    errorParse(error: any){
        if(error.isJoi){
            let message = " Incorect request "
            if(error.details.length > 0){
                message = error.details[0].message
             }
            this.addError(BAD_REQUEST, message)
        }else if(error.name === "ValidationError"){
            this.addError(BAD_REQUEST, error.message)
        }else{
            this.addError(SERVER_ERROR, "Server Error");
        }
    }
    
    setData(data: any) {
        this.data = data;
    }
    
    send() {    
        this.response.status(this.status);
        this.response.setHeader('Content-type', 'application/json');
        const body:{
            status: number,
            errors: Array<string>,
            data: any,
            notice: Array<string>,
            warnings: Array<string>
        } = {
          status: this.status,
          errors: this.errors,
          data: this.data,
          notice: this.notice,
          warnings: this.warnings,
        };
    
        this.response.json(body);
    }
}