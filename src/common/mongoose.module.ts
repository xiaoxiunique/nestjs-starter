import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as schemas from './../entities';

export const features = Object.keys(schemas).map((v) => {
  const schema = schemas[v];
  return { name: schema.name, schema: schema.SCHEMA };
});

@Module({
  imports: [MongooseModule.forFeature(features)],
  providers: [],
  exports: [MongooseModule.forFeature(features)],
})
export class MongooseInnerModule {}
