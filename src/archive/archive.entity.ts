import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
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

  @Column()
  date: Date;

  @OneToMany(() => ArchiveImage, (images) => images.archive, { nullable: true, cascade: ['insert', 'update'] })
  images: ArchiveImage[];

  @ManyToOne(() => User, (user) => user.archive)
  user: User

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updated_at: Date;
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
  date: Date;

  @ApiProperty()
  images: string[];
}
