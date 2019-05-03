const expect = require('chai').expect;
const passport = require("passport");
const initPassport = require("../../../dist/helpers/passport").initPassport;

describe("Passport Helper", function(){
    describe("initPassport()", function(){
        it("should passport module should have strategy local and jwt", function(){
            let _passport = initPassport();
            //console.log(_passport);
            expect(_passport).to.have.property("_strategies");
            expect(_passport._strategies).to.have.property("local")
            expect(_passport._strategies).to.have.property("jwt");
        })
    })
})