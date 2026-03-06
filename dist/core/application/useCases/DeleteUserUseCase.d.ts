import type { IUserQueryRepository, IUserRepository } from "../../../interfaces/repositories/UserRepository";
export declare class DeleteUserUseCase {
    private readonly userRepository;
    private readonly userQueryRepository;
    constructor(userRepository: IUserRepository, userQueryRepository: IUserQueryRepository);
    execute(userId: string): Promise<void>;
}
//# sourceMappingURL=DeleteUserUseCase.d.ts.map