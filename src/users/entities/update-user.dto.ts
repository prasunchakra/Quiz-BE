import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password'] as const)
) {
  @ApiPropertyOptional({ 
    description: 'Current password (required for password change)',
    minLength: 8 
  })
  @IsOptional()
  @IsString()
  @MinLength(8)
  currentPassword?: string;

  @ApiPropertyOptional({ 
    description: 'New password',
    minLength: 8 
  })
  @IsOptional()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
  })
  newPassword?: string;
}