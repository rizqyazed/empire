let rows = 10;
let cols = 10;
var grid = new Array(cols);
let w, h;

function Cell(i ,j) {
  this.x = i;
  this.y = j;
  this.neighbors = [];
  this.isActive = false;
  this.activeNeighbors = [];
  this.visited = false;

  this.show = function(c) {
    fill(c);
    noStroke();
    ellipse(this.x * w + (w/2), this.y * h + (h/2), w/2)
  }
  
  this.pressed = function() {
    var d = dist(mouseX, mouseY, this.x * w + (w / 2), this.y * h + (h / 2))
    if (d < w / 2) {
      this.show("green");
      this.isActive = true;
      cycleDetection(this);
      
    }
  }

  this.addNeighbors = function() {
    var x = this.x;
    var y = this.y;
    if (x < cols - 1) {
      this.neighbors.push(grid[x + 1][y]);
    }
    if (x > 0) {
      this.neighbors.push(grid[x - 1][y]);
    }
    if (y < rows - 1) {
      this.neighbors.push(grid[x][y + 1]);
    }
    if (y > 0) {
      this.neighbors.push(grid[x][y - 1]);
    }
    if (x > 0 && y > 0) {
      this.neighbors.push(grid[x - 1][y - 1]);
    }
    if (x < cols - 1 && y > 0) {
      this.neighbors.push(grid[x + 1][y - 1]);
    }
    if (x > 0 && y < rows - 1) {
      this.neighbors.push(grid[x - 1][y + 1]);
    }
    if (x < cols - 1 && y < rows - 1) {
      this.neighbors.push(grid[x + 1][y + 1]);
    }
  }

  this.addActiveNeighbors = function() {
    for (let i = 0; i < this.neighbors.length; i++) {
      if (this.neighbors[i].isActive) {
        if (!this.activeNeighbors.includes(this.neighbors[i])) {
          this.activeNeighbors.push(this.neighbors[i]);
        }
        // print(this.neighbors[i].x + this.neighbors[i].y + "ACTIVE") 
      } else {
        // print(this.neighbors[i].x + this.neighbors[i].y + "NOT ACTIVE")
      }
    }
  }
}

function cycleDetection(cell) {
  var stack = [];
  var path = [];
  stack.push(cell);
  while (stack.length > 0) {
      var v = stack.pop();
      if (!v.visited) {
        path.push(v);
        v.visited = true;
        // print(v.neighbors)
        for (let i = 0; i < v.activeNeighbors.length; i++) {
          stack.push(v.activeNeighbors[i]);
          v.activeNeighbors[i].show("red"); 
          var p = path[1]
          if (path.includes(cell.activeNeighbors[i])) {
            if (cell.activeNeighbors[i] === p) {
              print("NO VALID")
            } else {
              print("CYCLE DETECTED")
              for (let v = 0; v < path.length; v++) {
                path[v].show("blue")
              }
            }
          }
        }
      }
    }
  for (let v = 0; v < path.length; v++) {
    path[v].visited = false;
  }
  print("path:")
  print(path);
}

function setup() {
  createCanvas(400, 400);
  background(220);

  w = width / cols;
  h = height / rows;

  for(let x = 0; x < cols; x++) {
    grid[x] = new Array(rows);
    for(let y = 0; y < rows; y++) {
      grid[x][y] = new Cell(x, y);
    }
  }

  for(let x = 0; x < cols; x++) {
    for(let y = 0; y < rows; y++) {
      grid[x][y].addNeighbors();
    }
  }

  for(let x = 0; x < cols; x++) {
    for(let y = 0; y < rows; y++) {
      grid[x][y].show(255);
    }
  }
}

function mousePressed() {
  for(let x = 0; x < cols; x++) {
    for(let y = 0; y < rows; y++) {
      grid[x][y].addActiveNeighbors();
      grid[x][y].pressed();
      // cycleDetection(grid[x][y])
    }
  }
}

function draw() {
  
}
