import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GQLPayloadMetadata {
  @Field(() => Int, { nullable: true })
  total_pages: number;
  @Field(() => Int, { nullable: true })
  current_page: number;
  @Field(() => Int, { nullable: true })
  next_page: number;
  @Field(() => Int, { nullable: true })
  per_page: number;
  @Field(() => Int, { nullable: true })
  total_count: number;
}

@ObjectType()
export class BasePayload {
  @Field(() => GQLPayloadMetadata)
  meta: GQLPayloadMetadata;
}
