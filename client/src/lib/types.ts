export interface Point {
  x: number;
  y: number;
}
export interface stateObject<T> {
  [key: string]: T;
}

export const isLiesBetween=(p:Point,a: Point , b: Point ): boolean=> {
    if (p.x > a.x && p.x < b.x) {
      if (p.y > a.y && p.y < b.y) {
        return true;
      }
    } else if (p.x > b.x && p.x < a.x) {
      if (p.y > b.y && p.y < a.y) {
        return true;
      }
    }
    return false;
  }

export const movePoint=(p:Point,move: Point): Point=> {
    return { x: move.x + p.x, y: move.y + p.y } satisfies Point;

}

