var vectors = new Array(30000)
.fill(0)
.map(vect => ({x: Math.floor(Math.random()*20 - 10),
      y: Math.floor(Math.random()*20 - 10),
      z: Math.floor(Math.random()*20 - 10)}))
.filter(vect => (vect.x**2 + vect.y**2 + vect.z**2 >= 0 && 
     vect.x**2 + vect.y**2 + vect.z**2 <= 3 && 
     vect.x >= -1 && 
     vect.x <= 1 &&
     vect.y >= 0 &&
     vect.z >= 0 ))
.sort((a,b) => (a.x**2 + a.y**2 + a.z**2) - (b.x**2 + b.y**2 + b.z**2))
.reduce((a, b) => a = {x: a.x + b.x, y: a.y + b.y, z: a.z + b.z});

console.log(vectors);
