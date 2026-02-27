import { GetJwksUseCase } from "../../../core/application/useCases/GetJwksUseCase";
import { GetJwksController } from "../controllers/GetJwksController";

export function makeGetJwksController() {
    const getJwksUseCase = new GetJwksUseCase()

    return new GetJwksController(getJwksUseCase)
}