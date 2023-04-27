// 개시물에 관한 로직을 처리하는 부분 => 이후 Controller에서 Service를 불러와서 사용한다.
// Service => Controller

import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
  // boards.model.ts에서 생성한 모델을 타입으로 정의
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    // 보드에 있는 모든 값 가져오기
    return this.boards;
  }

  createBoard(title: string, description: string) {
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
}
