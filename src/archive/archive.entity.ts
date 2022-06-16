import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ArchiveImage} from "../image/entity/archiveImage.entity";
import {User} from "../user/user.entity";
import {ApiProperty} from "@nestjs/swagger";

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
  images: ArchiveImage[];

  @ManyToOne(() => User, (user) => user.archive)
  user: User
}

export class ArchiveSaveRequestDTO {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  cover: string;

  @ApiProperty()
  images: string[];

}
