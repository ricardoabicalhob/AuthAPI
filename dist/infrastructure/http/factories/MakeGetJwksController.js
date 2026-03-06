"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetJwksController = makeGetJwksController;
const GetJwksUseCase_1 = require("../../../core/application/useCases/GetJwksUseCase");
const GetJwksController_1 = require("../controllers/GetJwksController");
function makeGetJwksController() {
    const getJwksUseCase = new GetJwksUseCase_1.GetJwksUseCase();
    return new GetJwksController_1.GetJwksController(getJwksUseCase);
}
//# sourceMappingURL=MakeGetJwksController.js.map