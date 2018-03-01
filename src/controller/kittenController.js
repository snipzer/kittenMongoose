import KittenRepository from "../repository/kittenRepository";
import _ from "underscore";
import HttpStatusService from "../services/httpStatusService";



export default class KittenController {

    constructor() {
        this.kittenRepository = new KittenRepository();
        this.httpStatusService = new HttpStatusService();
    }

    getKittens(req, res) {
        this.kittenRepository.getKittens()
            .then(kittens => this.sendJsonResponse(res, this.httpStatusService.ok, kittens))
            .catch(err => this.sendJsonResponse(res, this.httpStatusService.internalServerError, err));
    }

    getKittenById(req, res) {
        console.log(req.params.id);
        this.kittenRepository.getKittenById(req.params.id)
            .then(kitten => this.sendJsonResponse(res, this.httpStatusService.ok, kitten))
            .catch(err => this.sendJsonResponse(res, this.httpStatusService.internalServerError, err));
    }

    createKitten(req, res) {
        this.kittenRepository.createKitten()
            .then(kitten => this.sendJsonResponse(res, this.httpStatusService.ok, kitten))
            .catch(err => this.sendJsonResponse(res, this.httpStatusService.internalServerError, err));
    }

    sendJsonResponse(res, code, content) {
        res.status(code);
        res.json(content);
    }
}