import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Post } from 'src/posts/models/post.model';

interface ICreateUser {
  id: string,
  nickname: string,
  email: string,
  password: string,
  avatar: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, ICreateUser>{

  @Column({ type: DataType.STRING, unique: true, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false, primaryKey: true, unique: true })
  nickname: string;

  @Column({ type: DataType.STRING, allowNull: false, primaryKey: true, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING })
  avatar: string;

  @HasMany(() => Post)
  posts: Post[];

  /* todo
  @Column
  subscribers: string;

  @Column
  subscription: string;
  */
}
