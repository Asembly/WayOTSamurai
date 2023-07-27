import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { Post } from './posts/models/post.model';
import { User } from './users/models/user.model';
import { Comment } from './comments/models/comment.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FilesModule } from './files/files.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [

    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`]
    }),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      models: [Post, User, Comment]
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageProductionDefault()]
    }),

    UsersModule,

    AuthModule,

    PostsModule,

    CommentsModule,

    forwardRef(() => FilesModule),
  ],
})
export class AppModule { }
