const expect = require('chai').expect;
const config = require('../../../config').config;
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.MONGODB_URI + process.env.MONGODB_DB, { useNewUrlParser: true });

const UserModel = require("../../../dist/models/users").default;

const User = new UserModel();
let ID = null;

describe("UserModel", function(){
    before(function(){
        User.clearDatabase();
    })

    describe("create(data)", function(){
        it("should create new user", function(done){
            User.create({
                firstName: "Test",
                lastName: "Test",
                email: "test@mail.com",
                password: "test123"
            }).then((result)=>{
                expect(result).to.be.an("object")
                expect(result).to.have.property("_id")
                expect(result).to.have.property("firstName")
                expect(result).to.have.property("lastName")
                expect(result).to.have.property("email")
                expect(result).to.have.property("role")
                ID = result._id;
                done();
            }).catch((err)=>{
                done(err);
            })
        })

        it("should return Validation Error if it is duplication of email", function(done){
            User.create({
                firstName: "Test",
                lastName: "Test",
                email: "test@mail.com",
                password: "test123"
            }).then((result)=>{
                done(new Error("User was created, but it needs to handle Validation Error"));
            })
            .catch((err)=>{
                expect(err).to.have.property("name","ValidationError");
                done();
            })
        })

        it("should return Joi Validation Error, when it has incorrect data", function(done){
            User.create({
                firstName: "Test",
                lastName: 1,
                email: "testmailcom",
                password: "test123"
            }).then((result)=>{
                done(new Error("User was created, but it needs to handle Joi Error"));
            }).catch((err)=>{
                expect(err).to.have.property("isJoi");
                expect(err.isJoi).to.equal(true);
                done();
            })
        })
    })

    describe("checkCredantial(email, password)", function(){
        it("should take user data", function(done){
            User.checkCredantial("test@mail.com","test123")
                .then((result)=>{
                    expect(result).to.be.an("object")
                    expect(result).to.have.property("_id")
                    expect(result).to.have.property("firstName")
                    expect(result).to.have.property("lastName")
                    expect(result).to.have.property("email")
                    expect(result).to.have.property("role")
                    done()
                })
                .catch((err)=>{
                    done(err);
                })
        })

        it("should handle Error when send incorrect credentials", function(done){
            User.checkCredantial("test@mail.co","test13")
                .then((result)=>{
                    done(new Error("It should give error insted success result"))
                })
                .catch((err)=>{
                    done();
                })
        })
    })

    describe("one(id)", function(){
        it("should take user object", function(done){
            User.one(ID).then((result)=>{
                expect(result).to.be.an("object")
                expect(result).to.have.property("_id")
                expect(result).to.have.property("firstName")
                expect(result).to.have.property("lastName")
                expect(result).to.have.property("email")
                expect(result).to.have.property("role")
                done();
            }).catch((err)=>{
                done(err)
            })
        })

        it("should take validation error, whe we use incoreect ID", function(done){
            User.one("zzz").then((result)=>{
                done(new Error("it needs return  error instead success result"))
            }).catch((err)=>{
                expect(err).to.have.property("name","ValidationError");
                done();
            })
        })
    })

    describe("delete(id)", function(){
        it("should success remove", function(done){
            User.delete(ID).then((result)=>{
                expect(result).to.be.an("object");
                expect(result).to.have.property("ok",1);
                expect(result).to.have.property("n",1);
                expect(result).to.have.property("deletedCount",1);
                done()
            })
            .catch((err)=>{
                done(err);
            })
        })
    })
})


