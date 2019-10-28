import { Validations, MESSAGES, IS_VALID_STATE } from './validations';

let validations = new Validations();

describe("number validation", ()=>{
    let pattern;

    test("add pattern", ()=>{
        pattern = validations.set("numbers|min:5|max:100");
        expect(pattern.pattern).toBeNull();
        expect(pattern.message).toBe('');
        expect(pattern.type).toMatch(/number/);
        expect(pattern.isValid).toBe(IS_VALID_STATE.Inactive);
        expect(pattern.min).toEqual(5);
        expect(pattern.max).toEqual(100);
    })

    test("pass validation", ()=>{
       let res = validations.validate(10, pattern);
       expect(res.result).toBe(true);
       res = validations.validate(100, pattern);
       expect(res.result).toBe(true);
       res = validations.validate(5, pattern);
       expect(res.result).toBe(true);
    })

    test("number min need to fail", ()=>{
        let res = validations.validate(3, pattern);
        expect(res.result).toBe(false);
        expect(res.errorMessage).toBe(MESSAGES.numberTooSmall.replace("[option]", pattern.min));
    })

    test("number max need to fail", ()=>{
        let res = validations.validate(101, pattern);
        expect(res.result).toBe(false);
        expect(res.errorMessage).toBe(MESSAGES.numberTooBig.replace("[option]", pattern.max));
    })
})


describe("email validation", ()=>{
    let pattern;

    test("add pattern", ()=>{
        pattern = validations.set("email");

        expect(pattern.pattern).toBe(validations.patterns.email);
        expect(pattern.message).toBe(MESSAGES.IncorrectMail);
        expect(pattern.type).toMatch(/string/);
        expect(pattern.isValid).toBe(IS_VALID_STATE.Inactive);
        expect(pattern.min).toBeNull();
        expect(pattern.max).toBeNull();
    })

    test("pass validation", ()=>{
        let res = validations.validate("test.some@mail.net", pattern);
        expect(res.result).toBe(true);
        /*res = validations.validate("test@test.com", pattern);
        expect(res.result).toBe(true);*/
    })

    test("fail validation", ()=>{
        let res = validations.validate("test@test", pattern);
        expect(res.result).toBe(false);
        expect(res.errorMessage).toBe(MESSAGES.IncorrectMail);
        res = validations.validate("test&test", pattern);
        expect(res.result).toBe(false);
        expect(res.errorMessage).toBe(MESSAGES.IncorrectMail);
    })
})

describe("phone validation", ()=>{
    let pattern;

    test("add pattern", ()=>{
        pattern = validations.set("phone");

        expect(pattern.pattern).toBe(validations.patterns.phone);
        expect(pattern.message).toBe(MESSAGES.IncorrectPhone);
        expect(pattern.type).toMatch(/string/);
        expect(pattern.isValid).toBe(IS_VALID_STATE.Inactive);
        expect(pattern.min).toBeNull();
        expect(pattern.max).toBeNull();
    })

    test("pass validation", ()=>{
        let res = validations.validate("+380908877666", pattern);
        expect(res.result).toBe(true);
        res = validations.validate("0968877666", pattern);
        expect(res.result).toBe(true);
    })

    test("fail validation", ()=>{
        let res = validations.validate("+3809088", pattern);
        expect(res.result).toBe(false);
        expect(res.errorMessage).toBe(MESSAGES.IncorrectPhone);
        res = validations.validate("__66667", pattern);
        expect(res.result).toBe(false);
        expect(res.errorMessage).toBe(MESSAGES.IncorrectPhone);
    })
})
describe("string validation", ()=>{
    let pattern;

    test("add pattern", ()=>{
        pattern = validations.set("string|min:3|max:10");

        expect(pattern.pattern).toBeNull();
        expect(pattern.message).toBe('');
        expect(pattern.type).toMatch(/string/);
        expect(pattern.isValid).toBe(IS_VALID_STATE.Inactive);
        expect(pattern.min).toEqual(3);
        expect(pattern.max).toEqual(10);
    })

    test("pass validation", ()=>{
        let res = validations.validate("aaa aaa", pattern);
        expect(res.result).toBe(true);
    })

    test("fail min check", ()=>{
        let res = validations.validate("a", pattern);
        expect(res.result).toBe(false);
        expect(res.errorMessage).toBe(MESSAGES.stringTooShort.replace("[option]", pattern.min));
    })

    test("fail max check", ()=>{
        let res = validations.validate("aaaa aaaa aaaa", pattern);
        expect(res.result).toBe(false);
        expect(res.errorMessage).toBe(MESSAGES.stringTooLong.replace("[option]", pattern.max));
    })
})
describe("date validation", ()=>{
    let pattern;
    let startDate = new Date("2019-09-01 00:00:00");
    let endDate = new Date("2019-10-01 00:00:00");

    test("add pattern", ()=>{
        pattern = validations.set("date|min:" + startDate.getTime() + "|max:" + endDate.getTime());

        expect(pattern.pattern).toBeNull();
        expect(pattern.message).toBe('');
        expect(pattern.type).toMatch(/date/);
        expect(pattern.isValid).toBe(IS_VALID_STATE.Inactive);
        expect(pattern.min).toEqual(startDate.getTime());
        expect(pattern.max).toEqual(endDate.getTime());
    });

    test("pass validation", ()=>{
        let res = validations.validate(new Date("2019-09-31 00:00:00"), pattern);
        expect(res.result).toBe(true);
    })

    test("incorrect type", ()=>{
        let res = validations.validate("2019-09-28", pattern);
        expect(res.result).toBe(false);
        expect(res.errorMessage).toBe(MESSAGES.incorectType)

        res = validations.validate(1572274498596, pattern);
        expect(res.result).toBe(false);
        expect(res.errorMessage).toBe(MESSAGES.incorectType)
    })

    test("min date need to fail", ()=>{
        let res = validations.validate(new Date("2019-01-01 00:00:00"), pattern);
        expect(res.result).toBe(false);
        expect(res.errorMessage).toBe(MESSAGES.dateIsEarly.replace("[option]", new Date(pattern.min).toString()))
    })

    test("max date need to fail", ()=>{
        let res = validations.validate(new Date("2020-01-01 00:00:00"), pattern);
        expect(res.result).toBe(false);
        expect(res.errorMessage).toBe(MESSAGES.dateIsLate.replace("[option]", new Date(pattern.max).toString()))
    })
})