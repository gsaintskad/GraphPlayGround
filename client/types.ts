interface PointDto {
  x: number;
  y: number;
}

export class Point implements PointDto {
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  public isLiesBetween(a: Point | PointDto, b: Point | PointDto): boolean {
    if (this.x > a.x && this.x < b.x) {
      if (this.y > a.y && this.y < b.y) {
        return true;
      }
    } else if (this.x > b.x && this.x < a.x) {
      if (this.y > b.y && this.y < a.y) {
        return true;
      }
    }
    return false;
  }
  public movePoint(move: PointDto): PointDto {
    return { x: move.x + this.x, y: move.y + this.y } satisfies PointDto;
  }
}
