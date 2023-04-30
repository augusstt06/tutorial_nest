// 레포지토리 생성하기
// 레포지토리는 엔터티 객체와 함께 작동하며 엔티티 찾기, 삽입, 업데이트, 삭제 등을 처리한다.

import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entitiy';
import { CustomRepository } from './decorator/typeorm-ex.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
  constructor(@InjectRepository(Board) private dataSource: DataSource) {
    super(Board, dataSource.manager); // 변경
    // super(Board, dataSource.createEntityManager()) // 삭제
  }
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board);
    return board;
  }
}
