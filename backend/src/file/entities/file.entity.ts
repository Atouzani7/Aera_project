import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { UserEntity } from 'src/user/entities/user.entity';
import { WorkspaceEntity } from 'src/workspace/entities/workspace.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class File {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;

  @Field(() => ID, { description: 'ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { description: 'File Name' })
  @Column({ length: 100 })
  name: string;

  @Field(() => String, { description: 'File Path GDrive ID ' })
  @Column()
  path: string;

  @Field(() => String, { description: 'File Path GDrive ID ' })
  @Column()
  notion_id: string;

  @Field(() => String, { description: 'File Path GDrive ID ' })
  @Column()
  GDrive_id: string;

  @Field(() => [WorkspaceEntity])
  @ManyToOne(() => WorkspaceEntity, (workspace) => workspace.files_id)
  workspaces: WorkspaceEntity[];

  @Field(() => [UserEntity])
  @ManyToOne(() => UserEntity, (user) => user.file)
  user: UserEntity[];
}
