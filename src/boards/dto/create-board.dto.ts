import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  // 유효성 체크 추가
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
