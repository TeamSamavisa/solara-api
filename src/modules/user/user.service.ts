import bcrypt from 'bcrypt';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { GetUsersQueryDto } from './dto/get-users.dto';
import { Op } from 'sequelize';
import { buildWhere } from 'src/utils/build-where';
import { PaginatedResponse } from 'src/utils/types/paginated-response';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password_hash'>> {
    const existingEmail = await User.findOne({
      where: { email: createUserDto.email },
    });
    if (existingEmail) {
      throw new ConflictException('Email already taken');
    }

    if (createUserDto.registration) {
      const existingRegistration = await User.findOne({
        where: { email: createUserDto.registration },
      });
      if (existingRegistration) {
        throw new ConflictException('Registration already taken');
      }
    }

    // Transform password to password_hash
    const userData = {
      full_name: createUserDto.full_name,
      email: createUserDto.email,
      role: 'teacher',
      password_hash: await this.hashPassword(createUserDto.password),
    };

    const user = await this.userModel.create(userData);
    return this.sanitizeUserResponse(user);
  }

  async list(query: GetUsersQueryDto): Promise<PaginatedResponse<User>> {
    const { limit, offset, page, ...filter } = query;

    const result = await User.findAndCountAll({
      where: buildWhere(filter),
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    // Calculate pagination metadata
    const totalItems = result.count;
    const totalPages = Math.ceil(totalItems / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return {
      content: result.rows,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNextPage,
        hasPrevPage,
      },
    };
  }

  async getById(id: number) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getByEmail(email: string) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'password_hash'>> {
    const user = await this.ensureRecordExists(id);

    if (
      updateUserDto.email &&
      (await User.findOne({
        where: { email: updateUserDto.email, id: { [Op.ne]: id } },
      }))
    ) {
      throw new ConflictException('Email already taken');
    }

    // Transform password to password_hash if provided
    const updateData: UpdateUserDto & { password_hash?: string } = {};

    if (updateUserDto.full_name !== undefined) {
      updateData.full_name = updateUserDto.full_name;
    }
    if (updateUserDto.email) {
      updateData.email = updateUserDto.email;
    }
    if (updateUserDto.password) {
      updateData.password_hash = await this.hashPassword(
        updateUserDto.password,
      );
    }

    await user.update(updateData);
    return this.sanitizeUserResponse(user);
  }

  async remove(id: number) {
    const user = await this.ensureRecordExists(id);
    await user.destroy();
    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  private async ensureRecordExists(id: number): Promise<User> {
    const user = await this.getById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private sanitizeUserResponse(user: User): Omit<User, 'password_hash'> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...result } = user.get() as User;
    return result as Omit<User, 'password_hash'>;
  }
}
