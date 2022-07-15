import { Expose } from 'class-transformer';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    OneToMany
} from 'typeorm';
import { User } from './user.entity';



@Entity('session')
export class Session {
    @PrimaryGeneratedColumn()
    @Expose()
    id: number;

    @Column({ name: 'accessId', type: 'varchar', nullable: false, unique: true })
    @Expose()
    accessId: string;

    @Column({ name: 'creatorId', type: 'varchar', nullable: false })
    @Expose()
    creatorId: string;

    @OneToMany(() => User, (user) => user.id, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    user: User[];


}

