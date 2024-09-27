import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432, 
      username: 'postgres', 
      password: 'D31v1d3123',
      database: 'vrsoft', 
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
