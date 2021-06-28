export type Move = {
  id: number;
  name: string;
};

export type Event = {
  id: number;
  moveId: number;
  videoId: number;
  move: Move;
  timestamp: number;
};

export type Video = {
  id: number;
  url: string;
  events: Event[];
};
