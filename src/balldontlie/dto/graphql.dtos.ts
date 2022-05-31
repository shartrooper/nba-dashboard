import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GQLPayloadMetadata {
  @Field(() => Int)
  total_pages: number;
  @Field(() => Int)
  current_page: number;
  @Field(() => Int)
  next_page: null | number;
  @Field(() => Int)
  per_page: number;
  @Field(() => Int)
  total_count: number;
}
