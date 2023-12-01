// languages/languages.model.ts
/* Created By: Rahul 01-12-2023 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Language extends Document {

  @Prop({ required: true })
  name: string;

  @Prop()
  code: string;

  @Prop({default:1})
  status: string;

  @Prop()
  title: string;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);
export type LanguageDocument = Language & Document;
