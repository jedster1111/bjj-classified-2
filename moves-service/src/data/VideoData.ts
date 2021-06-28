import { Model } from "objection";
import { EventData } from "./EventData";

export class VideoData extends Model {
  id!: number;
  url!: string;

  static override tableName = "videos";

  static override relationMappings = {
    events: {
      relation: Model.HasManyRelation,
      modelClass: EventData,
      join: {
        from: "videos.id",
        to: "events.videoId",
      },
    },
  };
}
