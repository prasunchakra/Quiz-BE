import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { 
  IsString, 
  IsNotEmpty, 
  IsEmail, 
  IsEnum, 
  IsBoolean, 
  IsOptional,
  MinLength,
  MaxLength,
  Matches 
} from 'class-validator';
import { UserRole } from './user.entity';

export class CreateUserDto {
  @ApiProperty({ 
    description: 'Username',
    minLength: 3,
    maxLength: 50
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9_-]*$/, {
    message: 'Username can only contain letters, numbers, underscores and hyphens'
  })
  username: string;

  @ApiProperty({ 
    description: 'Email address',
    format: 'email'
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @ApiProperty({ 
    description: 'Password',
    minLength: 8,
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
  })
  password: string;

  @ApiPropertyOptional({ 
    enum: UserRole,
    default: UserRole.USER,
    description: 'User role'
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiPropertyOptional({ 
    default: true,
    description: 'User account status'
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}