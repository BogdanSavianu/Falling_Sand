let grid;
let w = 10;
let cols, rows;
let hue = 1;

function makeMatrix(cols, rows) {
  let matrix = new Array(rows);
  for(let i = 0; i < matrix.length; i++){
    matrix[i] = new Array(cols);
    for(let j = 0; j < matrix[i].length; j++)
      matrix[i][j]=0;
  }
  return matrix;
}

function setup() {
  createCanvas(600, 700);
  colorMode(HSB, 360, 255, 255);
  cols = width / w;
  rows = height / w;
  grid = makeMatrix(cols, rows);
  
  for(let i = 0; i < rows; i ++){
    for(let j = 0; j < cols; j++){
      grid[i][j] = 0;
    }
  }
}

function mouseDragged(){
  let mouseCol = floor(mouseX / w);
  let mouseRow = floor(mouseY / w);
  
  let matrix = 3;
  let margin = floor(matrix/2);
  for(let i = -margin; i <= margin; i++){
    for(let j = -margin; j <= margin; j++){
      if(random(1) < 0.66){
        let col = mouseCol + j;
        let row = mouseRow + i;
        if(col >= 0 && col <= cols - 1 && row >= 0 && row <= rows -1)
        grid[row][col] = hue;
      }
    }
  }
  hue += 0.5;
  if(hue === 360)
    hue = 1;
}

function draw() {
  background(220);
  
  for(let i = 0; i < rows; i ++){
    for(let j = 0; j < cols; j++){
      noStroke();
      if(grid[i][j] > 0){
        fill(grid[i][j], 255, 255);
        let x = j*w;
        let y = i*w;
        square(x,y,w);
      }
    }
  }
  
  let nextGrid = makeMatrix(cols, rows);
  
  for(let i = 0; i < rows; i++){
    for(let j = 0; j < cols; j++){
      let state = grid[i][j];
      if(state > 0){
        if(i + 1 < rows){
          let below = grid[i+1][j];
          
          let dir = random([-1,1]);
          let belowL = grid[i+1][j-dir];
          let belowR = grid[i+1][j+dir];
          
          if(below === 0)
            nextGrid[i+1][j] = state;
          else if(belowL === 0)
            nextGrid[i+1][j-dir] = state;
          else if(belowR === 0)
            nextGrid[i+1][j+dir] = state;
          else nextGrid[i][j] = state;
        }
        else nextGrid[i][j] = state;
      }
    }
  }
  
  grid = nextGrid;
}