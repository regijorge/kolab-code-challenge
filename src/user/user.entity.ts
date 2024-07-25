import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string 

  @Column()
  username!: string

  @Column()
  password!: string

  @Column({ type: 'uuid', nullable: true })
  parentUserId!: string | null
}