// 개시물에 관한 로직을 처리하는 부분 => 이후 Controller에서 Service를 불러와서 사용한다.
// Service => Controller

import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  // boards.model.ts에서 생성한 모델을 타입으로 정의
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    // 보드에 있는 모든 값 가져오기
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto) {
    // 생성한 dto 사용
    const { title, description } = createBoardDto;
    const board: Board = {
      // unique 한 id 생성
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(board);
    return board;
  }

  // id값으로 게시물을 가져오는 메서드
  getBoardById(id: string) {
    // id값 검색 결과가 없을때의 예외 처리
    // 예외 인스턴스를 생성한다.
    const found = this.boards.find((board) => board.id === id);
    if (!found) {
      // 에러메시지에 커스텀 메시지 전송하기
      throw new NotFoundException(`Can't find Board id ${id}`);
    }
    return found;
  }

  // id값으로 게시물을 지우는 메서드
  // 지우는것에 굳이 리턴을 줄 필요는 없어서 타입은 void
  deleteBoard(id: string): void {
    this.boards = this.boards.filter((board) => board.id !== id);
  }

  // 게시물 상태 업데이트 메서드
  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
