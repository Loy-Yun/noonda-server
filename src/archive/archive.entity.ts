import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ synchronize: true })
export class Archive {

  @PrimaryGeneratedColumn()
  id: number;
}
