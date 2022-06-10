import { Injectable, CanActivate, ExecutionContext, Logger } from "@nestjs/common";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
  logger: Logger;

  constructor(
    private readonly userService: UserService
  ) {
    this.logger = new Logger();
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    return await this.userService.validate(request.headers["user-authorization"]);
  }
}
