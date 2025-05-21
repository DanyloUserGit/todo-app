import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User{
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column({type:"varchar", length: 64, unique:true, update:false})
    email:string;

    @Column({type:"varchar", length: 255})
    fullName:string;

    @Column("uuid")
    password:string;
}