import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const BearerAuth = () => UseGuards(AuthGuard('jwt'));
