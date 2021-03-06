import BeerController from "../controllers/beer";
import { disconnect } from "../schemas";

const Beer = require("../schemas/beer");
const httpMocks = require("node-mocks-http");

BeerController.postBeer = jest.fn();
BeerController.getBeers = jest.fn();

describe("testing ./src/test/beer.spec.ts", () => {
  it("should have a postBeer function", () => {
    expect(typeof BeerController.postBeer).toBe("function");
  });

  it("should call postBeer", async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    await BeerController.postBeer(req, res);
    expect(BeerController.postBeer).toBeCalled();
    // expect(Beer.create).toBeCalled();
    expect(BeerController.postBeer).toBeCalledTimes(1);
  }, 30000);

  it("should call getBeers", async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    await BeerController.getBeers(req, res);

    expect(BeerController.getBeers).toBeCalled();
    expect(BeerController.getBeers).toBeCalledTimes(1);
  }, 50000);

  // it("should call likeBeer", async () => {
  //     const req = httpMocks.createRequest();
  //     const res = httpMocks.createResponse();

  //     await BeerController.likeBeer(req, res);

  //     expect(BeerController.likeBeer).toBeCalled();
  //     expect(BeerController.likeBeer).toBeCalledTimes(1);

  // }, 50000);

  // it("should call unlikeBeer", async () => {
  //     const req = httpMocks.createRequest();
  //     const res = httpMocks.createResponse();

  //     await BeerController.unlikeBeer(req, res);

  //     expect(BeerController.unlikeBeer).toBeCalled();
  //     expect(BeerController.unlikeBeer).toBeCalledTimes(1);

  // }, 50000);
});

// Disconnect Mongoose
afterAll(async () => {
  await disconnect();
});
