import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ synchronize: false })
export class Archive {

  @PrimaryGeneratedColumn()
  id: number;
}
