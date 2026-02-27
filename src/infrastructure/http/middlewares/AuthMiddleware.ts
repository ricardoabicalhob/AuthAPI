import type { FastifyReply, FastifyRequest } from "fastify"
import { TokenService } from "../../../core/domain/services/TokenService"
import { UserPrismaQueryRepository } from "../../database/UserPrismaRepository"
import { UnauthorizedError } from "../../../core/domain/erros/UnauthorizedError"

interface JwtPayload {
    sub :string
    iat :number
}

export async function authMiddleware(
    request :FastifyRequest,
    reply :FastifyReply
) {
    const authHeader = request.headers.authorization

    if(!authHeader) {
        throw new UnauthorizedError()
    }

    const [ scheme, token ] = authHeader.split(" ")

    if(scheme !== "Bearer" || !token) {
        throw new UnauthorizedError()
    }

    try {
        const tokenService = new TokenService()
        const decoded = tokenService.verifyAccessToken(token) as JwtPayload

        const userQueryRepository = new UserPrismaQueryRepository()
        const user = await userQueryRepository.findById(decoded.sub)

        if(!user || user.deletedAt) {
            throw new UnauthorizedError()
        }

        if(
            user.passwordChangeAt &&
            decoded.iat * 1000 < user.passwordChangeAt.getTime()
        ) {
            throw new UnauthorizedError()
        }

        request.user = {
            id: user.id
        }

    } catch (error) {
        throw new UnauthorizedError()        
    }
}