const expect = require('chai').expect;
const Request = require("../../../dist/helpers/request").Request;
const ClientRequest = require("http").ClientRequest;

describe("Request Helper", function(){
    describe("fetch()", function(){
        let req = new ClientRequest();

        it("shoud return object with user data", function(){
            req.body = {
                firstName: "Test",
                lastName: "Test",
                email: "test@mail.com",
                password: "test123"
            }

            let Req = new Request(req);
            let data = Req.fetch({ 
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            });

            expect(data).to.be.a("object");
            expect(data).to.have.property("firstName").equal("Test");
            expect(data).to.have.property("lastName").equal("Test");
            expect(data).to.have.property("email").equal("test@mail.com");
            expect(data).to.have.property("password").equal("test123");
        });

        it("should return empty object", function(){
            req.body = {}
            let Req = new Request(req);
            let data = Req.fetch({ 
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            });

            expect(data).to.be.a("object");
            expect(data).to.not.have.property("firstName");
            expect(data).to.not.have.property("lastName");
            expect(data).to.not.have.property("email");
            expect(data).to.not.have.property("password");
        })
    })
})