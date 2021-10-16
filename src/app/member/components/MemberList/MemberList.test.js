const MemberList = require("./MemberList")

// @ponicode
describe("componentWillMount", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["Anas", "Edmond", "Jean-Philippe"], ["Jean-Philippe", "Jean-Philippe", "Jean-Philippe"], ["Anas", "George", "Jean-Philippe"]]
        inst = new MemberList.default(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentWillMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})
