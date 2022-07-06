import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { UserDataDto } from 'src/authentication/auth/dto/userData.dto';
@Injectable()
export class UserService {
    @InjectRepository(User)
    private usersRepository: Repository<User>;

    findOne(whereCondition, relations?): Promise<User | undefined> {
        return this.usersRepository.findOne({
            where: whereCondition,
            relations,
        });
    }

    create(data) {
        this.usersRepository.create(data);
        return this.usersRepository.save(data);
    }

    update(user: User) {
        return this.usersRepository.save({ id: user.id, ...user });
    }

    findAll(req, where) {
        return this.usersRepository.findAndCount({
            where
        });
    }
}
