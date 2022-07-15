import { Injectable, } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from 'src/entities/session.entity';

@Injectable()
export class SessionService {
    @InjectRepository(Session)
    private usersRepository: Repository<Session>;
    create(data) {
        this.usersRepository.create(data);
        return this.usersRepository.save(data);
    }

    findOne(whereCondition, relations?): Promise<Session | undefined> {
        return this.usersRepository.findOne({
            where: whereCondition,
            relations,
        });
    }

}
