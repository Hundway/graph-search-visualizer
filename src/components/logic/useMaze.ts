type MazeCell = 0 | 1 | 2 | 3; // 0 = passage, 1 = wall, 2 = start, 3 = end
type Cell = { r: number; c: number };

export class Maze {
  readonly rows: number;
  readonly cols: number;
  grid: MazeCell[][];

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
    this.grid = this.createGrid();
  }

  private createGrid(): MazeCell[][] {
    return Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => 1)
    );
  }

  private randInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private randCell(): Cell {
    return {
      r: this.randInt(0, this.rows - 1),
      c: this.randInt(0, this.cols - 1),
    };
  }

  private getNeighbors(cell: Cell): Cell[] {
    const neighbors: Cell[] = [];
    if (cell.r > 0) neighbors.push({ r: cell.r - 1, c: cell.c });
    if (cell.r < this.rows - 1) neighbors.push({ r: cell.r + 1, c: cell.c });
    if (cell.c > 0) neighbors.push({ r: cell.r, c: cell.c - 1 });
    if (cell.c < this.cols - 1) neighbors.push({ r: cell.r, c: cell.c + 1 });
    return neighbors;
  }

  private isPassage(cell: Cell): boolean {
    return this.grid[cell.r][cell.c] === 0;
  }

  private isWall(cell: Cell): boolean {
    return this.grid[cell.r][cell.c] === 1;
  }

  private isFreeWay(cell: Cell): boolean {
    const passages = this.getNeighbors(cell).filter((n) =>
      this.isPassage(n)
    ).length;
    return passages === 1;
  }

  private setPasage(cell: Cell): void {
    this.grid[cell.r][cell.c] = 0;
  }

  generate(): MazeCell[][] {
    const start = this.randCell();
    const stack: Cell[] = [start];
    this.setPasage(start);

    while (stack.length > 0) {
      const current = stack[stack.length - 1];
      const neighbors = this.getNeighbors(current)
        .filter((n) => this.isWall(n))
        .filter((n) => this.isFreeWay(n));

      if (neighbors.length === 0) {
        stack.pop();
        continue;
      }

      const next = neighbors[this.randInt(0, neighbors.length - 1)];
      this.setPasage(next);
      stack.push(next);
    }

    let startCell: Cell;
    do {
      startCell = this.randCell();
    } while (this.isWall(startCell));

    let endCell: Cell;
    do {
      endCell = this.randCell();
    } while (this.isWall(endCell));

    this.grid[startCell.r][startCell.c] = 2;
    this.grid[endCell.r][endCell.c] = 3;

    return this.grid;
  }

  static generate(rows: number, cols: number): MazeCell[][] {
    return new Maze(rows, cols).generate();
  }
}
