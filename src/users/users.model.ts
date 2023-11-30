// users/user.model.ts
/* Created By: Rahul 30-11-2023 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {

  @Prop()
  name: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phone: string;


}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
