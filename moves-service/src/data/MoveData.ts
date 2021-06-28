import { Model } from "objection";
import { EventData } from "./EventData";

export class MoveData extends Model {
  id!: number;
  name!: string;

  static override tableName = "moves";

  static override relationMappings = {
    events: {
      relation: Model.HasManyRelation,
      modelClass: EventData,
      join: {
        from: "moves.id",
        to: "events.moveId",
      },
    },
  };
}
