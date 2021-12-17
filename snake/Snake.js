function Snake() {
  this.location = [[ds],
                   [ds]];
  this.velocity = [1,0];
  this.heading = 1;
  
  this.move = function(z) {
    let n = this.location[0].length;
    if (n > 1) {
      for (let i = n-1;i > 0 ;i -= 1) {
        this.location[0][i] = this.location[0][i-1];
        this.location[1][i] = this.location[1][i-1];
      }
    }
    this.location[0][0] += z * this.velocity[0];
    this.location[1][0] += z * this.velocity[1];
  }
  
  this.show = function(z) {
    for (let i = 0;i < this.location[0].length;i++) {
      fill(128,36,155);
      rect(this.location[0][i],
           this.location[1][i],
           z,z);
    }
  }
  
  this.dir = function(v,w) {
    this.velocity[0] = v;
    this.velocity[1] = w;
    this.heading = v + 2*w;
  }
  
  this.eat = function(biteLoc,ds) {
    let newX = this.location[0][0] + ds * this.velocity[0];
    let newY = this.location[1][0] + ds * this.velocity[1];
    
    if ((newX === biteLoc[0]) && (newY === biteLoc[1])) {
        this.location[0] = this.location[0].concat(biteLoc[0]);
        this.location[1] = this.location[1].concat(biteLoc[1]);
        createBite(ds,this);
        }
  }
  
  this.die = function(ds) {
    let x = this.location[0][0];
    let y = this.location[1][0];
    let n = this.location[0].length;
    let a = 0;
    
    for (let i = 1; i < n; i++) {
      if ((x == this.location[0][i]) &&
          (y == this.location[1][i])) {
          a = 1;
      }
    }
    
    if ((x < 0+ds) || (x >= width-ds) || (y < 0+ds) ||
        (y >= height-ds) || (a == 1)) {
      return false;
    }
    return true;
  }
}