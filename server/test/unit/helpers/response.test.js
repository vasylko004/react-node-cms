const expect = require('chai').expect;
const ResponseHelper = require("../../../dist/helpers/response");
const Response = ResponseHelper.Response;
const ValidationError = require("../../../dist/helpers/errors").ValidationError;
const Joi = require("joi");
//const ServerResponse = require("http").ServerResponse;

function TrickResponse(){
    this.data = {
        status: 200,
        header: {},
        data: null
    };
}
TrickResponse.prototype.status = function(status){
    this.data.status = status;
}
TrickResponse.prototype.setHeader = function(name, value){
    this.data.header[name] = value;
}
TrickResponse.prototype.json = function(data){
    this.data.data = data;
}

let tricResponse = new TrickResponse();
let Res = new Response(tricResponse);

describe("Response Helper", function(){
    describe("addWarning(message)", function(){
        it("should add item to warnings", function(){
            Res.addWarning("TestWarning");
            expect(Res.warnings).to.be.a("array").with.lengthOf(1);
            expect(Res.warnings).to.include("TestWarning");
        })
    })
    describe("addNotice(message)", function(){
        it("should add item to notice", function(){
            Res.addNotice("TestNotice");
            expect(Res.notice).to.be.a("array").with.lengthOf(1);
            expect(Res.notice).to.include("TestNotice");
        });
    })
    describe("addError(code, message)", function(){
        it("should add item to error and change status", function(){
            Res.addError(ResponseHelper.BAD_REQUEST, "TestError");
            expect(Res.status).to.equal(ResponseHelper.BAD_REQUEST);
            expect(Res.errors).to.be.a("array").with.lengthOf(1);
            expect(Res.errors).to.include("TestError");
        })
    })

    describe("setData(data)", function(){
        it("should set correct object into property data", function(){
            Res.data = null;
            Res.setData({is: "correct"});
            expect(Res.data).to.be.a("object");
            expect(Res.data).to.have.property("is");
            expect(Res.data.is).to.equal("correct");
        })
    })

    describe("parseError(error)", function(){
        it("should handle Errors with add items to errors and change status to 500 ", function(){
            Res.errors = [];
            Res.status = 200;
            Res.errorParse(new Error("ServerError"));
            expect(Res.status).to.equal(ResponseHelper.SERVER_ERROR);
            expect(Res.errors).to.be.a("array").with.lengthOf(1);
            expect(Res.errors).to.include("ServerError");
        })

        it("should handle ValidationError with add item to error and change status to 400", function(){
            Res.errors = [];
            Res.status = 200;
            Res.errorParse(new ValidationError("ValidationError"));
            expect(Res.status).to.equal(ResponseHelper.BAD_REQUEST);
            expect(Res.errors).to.be.a("array").with.lengthOf(1);
            expect(Res.errors).to.include("ValidationError");
        })



        it("should handle JoiError with add item to error, add details to data and set status 400", function(){
            let Person = Joi.object().keys({
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                email: Joi.string().required()
            })
            Res.errors = [];
            const result = Joi.validate({email: "some@mail.com"}, Person);
            Res.errorParse(result.error);
            expect(Res.status).to.equal(ResponseHelper.BAD_REQUEST);
            expect(Res.errors).to.be.a("array").with.lengthOf(1);
            expect(Res.data).to.be.a("array").with.lengthOf(1);
            expect(Res.data[0]).to.have.property("message");
            expect(Res.data[0]).to.have.property("path");
            expect(Res.data[0]).to.have.property("type");
            expect(Res.data[0]).to.have.property("context");
        })
    })
})