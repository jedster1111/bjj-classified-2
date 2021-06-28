import { Model } from "objection";
import path from "path";

export class EventData extends Model {
  id!: string;
  moveId!: string;
  videoId!: string;
  timestamp!: number;

  static override tableName = "events";

  static override relationMappings = {
    move: {
      modelClass: path.join(__dirname, "MoveData"),
      relation: Model.BelongsToOneRelation,
      join: {
        from: "events.moveId",
        to: "moves.id",
      },
    },
    video: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, "VideoData"),
      join: {
        from: "events.moveId",
        to: "videos.id",
      },
    },
  };
}
