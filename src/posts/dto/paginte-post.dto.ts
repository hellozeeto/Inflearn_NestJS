import { IsIn, IsNumber, IsOptional } from 'class-validator';

export class PaginatePostDto {
  @IsNumber()
  @IsOptional()
  where__id_less_than?: number;
  // 이전 마지막 데이터의 ID
  // 이 프로퍼티에 입력된 ID 보다 높은 ID부터 값을 가져오기

  @IsNumber()
  @IsOptional()
  where__id_more_than?: number;

  //10, 9, 8 ,7
  //where__id_more_than = 7
  //6, 5, 4, 3
  //where__id_less_than = 7

  // 정렬
  // createAt -> 생성된 시간의 내림차/오름차 순으로 정렬

  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  order__createdAt: 'ASC' | 'DESC' = 'ASC';

  //  몇개의 데이터를 응답을 받을지
  @IsNumber()
  @IsOptional()
  take: number = 20;
}
