import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ArchiveImage} from "../image/entity/archiveImage.entity";

@Entity({ synchronize: true })
export class Archive {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  category: string;

  @Column()
  cover: string;

  @OneToMany(() => ArchiveImage, (images) => images.archive, { nullable: true })
  images: ArchiveImage[]
}
