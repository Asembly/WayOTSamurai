import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Post } from 'src/posts/models/post.model';

interface ICreateComment {
  id: string,
  text: string,
  postId: string;
}

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment, ICreateComment> {

  @Column({ type: DataType.STRING, unique: true, primaryKey: true })
  id: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  text: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0, allowNull: false })
  likes: number;

  @ForeignKey(() => Post)
  postId: string;

  @BelongsTo(() => Post)
  post: Post;
}
