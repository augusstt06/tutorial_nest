import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmExModule } from './decorator/typeorm-ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([])],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
