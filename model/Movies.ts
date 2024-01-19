import { Schema, model, Document, models } from "mongoose";

export interface IMovies extends Document {
  title: string;
  publishingYear: number;
  bannerImage:string
  id?: string
}

const modelName = "Movies";

const moviesSchema = new Schema<IMovies>({
  title: { type: String, required: true },
  publishingYear: { type: Number, required: true },
  bannerImage: { type: String, required: true, default: '' },
});

const Movies =
  (models[modelName] as any) || model<IMovies>(modelName, moviesSchema);

export default Movies;
