import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../board-status.enum';

// 게시글의 상태값은 PUBLIC, PRIVATE만 올 수 있기 때문에 이외의 값이 오면 에러가 발생 할 수 있게 유효성 검사 파이프를 커스텀 한다.
export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOption = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];
  // 첫번째 파라미터 value : 처리가 된 인자의 값
  // 두번째 파라미터 metadata : 인자에 대한 메타 데이터를 포함한 객체
  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status option`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const index = this.StatusOption.indexOf(status);
    return index !== -1;
  }
}
