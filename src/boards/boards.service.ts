// 개시물에 관한 로직을 처리하는 부분 => 이후 Controller에서 Service를 불러와서 사용한다.
// Service => Controller

import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entitiy';

@Injectable()
export class BoardsService {
  constructor(
    // @InjectRepository(BoardRepository)
    // @InjectRepository(Board)
    private boardRepository: BoardRepository,
  ) {}
  // // boards.model.ts에서 생성한 모델을 타입으로 정의
  // getAllBoards(): Board[] {
  //   // 보드에 있는 모든 값 가져오기
  //   return this.boards;
  // }
  // createBoard(createBoardDto: CreateBoardDto) {
  //   // 생성한 dto 사용
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     // unique 한 id 생성
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(board);
  //   return board;
  // }
  // 게시물 생성
  // async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
  //   const { title, description } = createBoardDto;
  //   const board = this.boardRepository.create({
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   });
  //   await this.boardRepository.save(board);
  //   return board;
  // }
  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }
  // // id값으로 게시물을 가져오는 메서드
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Can't find Board id ${id}`);
    }
    return found;
  }
  // getBoardById(id: string) {
  //   // id값 검색 결과가 없을때의 예외 처리
  //   // 예외 인스턴스를 생성한다.
  //   const found = this.boards.find((board) => board.id === id);
  //   if (!found) {
  //     // 에러메시지에 커스텀 메시지 전송하기
  //     throw new NotFoundException(`Can't find Board id ${id}`);
  //   }
  //   return found;
  // }
  // // id값으로 게시물을 지우는 메서드
  // // 지우는것에 굳이 리턴을 줄 필요는 없어서 타입은 void
  // deleteBoard(id: string): void {
  //   // 없는 게시물을 지우려 할때는 getBoardById를 사용하여 먼저 게시물이 있는지 확인해준다.
  //   // 게시물이 없다면 getBoardById 메서드 안에서 예외처리가 발생하고, 있다면 삭제가능
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }
  // // 게시물 상태 업데이트 메서드
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
