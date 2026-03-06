import type { FastifyReply, FastifyRequest } from "fastify"
import { TokenService } from "../../../core/domain/services/TokenService"
import { UserPrismaQueryRepository } from "../../database/UserPrismaRepository"
import { UnauthorizedError } from "../../../core/domain/erros/UnauthorizedError"

interface JwtPayload {
    name :string
    email :string
    passwordChangeAt: Date
    iat: number
    exp: number
    aud: string
    iss: string
    sub: string
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
        const userPersistido = await userQueryRepository.findById(decoded.sub)

        if(!userPersistido || userPersistido.deletedAt) {
            throw new UnauthorizedError()
        }

        if(
            userPersistido.passwordChangeAt &&
            decoded.iat * 1000 < userPersistido.passwordChangeAt.getTime()
        ) {
            throw new UnauthorizedError()
        }

        request.user = {
            id: userPersistido.id
        }

    } catch (error) {
        throw new UnauthorizedError()        
    }
}