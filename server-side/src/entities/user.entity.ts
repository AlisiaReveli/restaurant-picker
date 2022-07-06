import { Expose } from 'class-transformer';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn
} from 'typeorm';



@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    @Expose()
    id: number;

    @Column({ name: 'googleId', type: 'varchar', nullable: false })
    @Expose()
    googleId: string;

    @Column({ name: 'name', type: 'varchar', nullable: true })
    @Expose()
    name: string;

    @Column({ name: 'email', type: 'varchar', nullable: false })
    email: string;

    @Column({ name: 'picture', type: 'varchar', nullable: false })
    picture: string;

    @Column({ nullable: true })
    location: string

}
