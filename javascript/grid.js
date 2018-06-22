// var canvas = document.getElementById('canvas');
// var c = canvas.getContext('2d');
// c.fillStyle = "red";
// c.fillRect(0,0,40,40);


class Grid {
  constructor(zombie, human) {
    this.grid = this.generateGrid();
    this.zombie = zombie;
    this.human = human;
  }

generateGrid () {
  let placement = ['z','h','h','h','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'];
  let grid = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
  for (let i = 0; i < 30; i++) {
      while (grid[i].length < 40) {
        let random = placement[Math.floor(Math.random() * 40)];
            grid[i].push(random);
    }
  }
  return grid;
}

  getMoves(grid,y,x,space) {
    let result = [];
    if (y > 0 && grid[y-1][x] === 'b') {result.push([-1,0]);}
    if (y < 29 && grid[y+1][x] === 'b') {result.push([1,0]);}
    if (x > 0 && grid[y][x-1] === 'b') {result.push([0,-1]);}
    if (x < 39 && grid[y][x+1] === 'b') {result.push([0,1]);}
    if (space === 'z' && result.length > 0){
      return this.closeMoves(grid,y,x,result);
    }
    return result;
  }

  closeMoves(grid,y,x,arr) {
    let newArr = [];
    for (let i = y - 3; i <= y + 3; i++) {
      for (let j = x - 3; j <= x + 3; j++) {
        if(i > 0 && j > 0 && i < 30 && j < 40){
        const abs = Math.abs(i - j);
        if (grid[i][j] === 'h' && abs <= 3){
          if (i < y && j > x){
            if (this.includesArray(arr,[0,1])){newArr.push([abs,[0,1]]);}
            if (this.includesArray(arr,[-1,0])){newArr.push([abs,[-1,0]]);}
          }
          if (i < y && j < x){
            if (this.includesArray(arr,[-1,0])){newArr.push([abs,[-1,0]]);}
            if (this.includesArray(arr,[0,-1])){newArr.push([abs,[0,-1]]);}
          }
          if (i > y && j < x){
            if (this.includesArray(arr,[0,-1])){newArr.push([abs,[0,-1]]);}
            if (this.includesArray(arr,[1,0])){newArr.push([abs,[1,0]]);}
          }
          if (i > y && j > x){
            if (this.includesArray(arr,[0,1])){newArr.push([abs,[0,1]]);}
            if (this.includesArray(arr,[1,0])){newArr.push([abs,[1,0]]);}
          }
        }
      }
    }
  }
    if (newArr.length > 0){
      return [newArr.sort((a) => a[0])[0][1]];
    }
    return arr;
  }

  includesArray(arr, item) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].toString() === item.toString()) {return true;}
    }
    return false;
  }

  draw(ctx) {
    this.grid.forEach((arr, i) => {
      arr.forEach((space, j) => {
        switch (space){
          case 'z':
          // ctx.fillStyle = "red";
          ctx.drawImage(this.zombie,j*20,i*20,20,20);
          // ctx.fillRect(j*20,i*20,20,20);
          break;
          case 'h':
          // ctx.fillStyle = "black";
          ctx.drawImage(this.human,j*20,i*20,20,20);
          // ctx.fillRect(j*20,i*20,20,20);
          break;
          case 'b':
          ctx.fillStyle = "darkgrey";
          // ctx.fillStyle = "#fcfcfc";
          ctx.fillRect(j*20,i*20,20,20);
          break;
        }
      });
  });
}

}

export default Grid;
