import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Comment } from 'src/comments/models/comment.model';
import { User } from 'src/users/models/user.model';

interface ICreatePost {
  id: string,
  text: string,
  image: string,
  userId: string,
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, ICreatePost> {

  @Column({ type: DataType.STRING, unique: true, primaryKey: true })
  id: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  text: string;

  @Column({ type: DataType.STRING })
  image: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  likes: string;

  @ForeignKey(() => User)
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Comment)
  comments: Comment[];
}
