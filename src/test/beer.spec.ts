import BeerController from "../controllers/beer";

const Beer = require('../schemas/beer');
const httpMocks = require('node-mocks-http');

BeerController.postBeer = jest.fn();

describe("beer controller create", () => {
    it("should have a postBeer function", () => {
        expect(typeof BeerController.postBeer).toBe("function");
    })
    it("should call postBeer", () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();

        req.body = {
            name_korean: "버드와이저",
            name_english: "Budweiser",
            image: "https://w.namu.la/s/f175e20dd8249487f7c90f64e67c5eeaebcd20f735d4d520108525e07c9345627d74b5afadabcc1d25601ef7ee336df7ec5baa2a6150c678f84d9c42b132c14f66a81c61cf081af5c8be31473f6af3ab02a21646f9fef91e7745b537a20e025464a0411a3e132c5a8cb7d48c0d8e5a20",
            degree: 5.0,
            categoryId: "610273ad00910cc5bd25f0d7",
            hashtag: [
                "황금색",
                "안호이저 부시",
                "라이트바디"
            ],
            features: {
                "bitter" : 3,
                "crispy" : 5,
                "flavor" : 2,
                "sweet" : 1,
                "nutty" : 3
            }
        }
        console.log(req, res.locals)
        BeerController.postBeer(req, res);

        expect(BeerController.postBeer).toBeCalled();
    });


});