import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    AuthModule,
    TransactionModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'containers-us-west-177.railway.app',
      username: 'postgres',
      password: 'B5rEiaghg1l5OvORoxva',
      port: 6458,
      database: 'railway',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
