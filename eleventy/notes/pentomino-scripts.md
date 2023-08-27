# Pentomino Puzzle Scripts
Helper scripts (javascript) to present pentomino content.

Generate checkerboard maps:

```
size=4;
arr = [];
for (i=1;i<=size*2;i++) { for (j=1;j<=size*3;j++) if (j<=size*2 || i<=size) arr.push([i,j,(i+j)%2-2]) };
JSON.stringify(arr)
```

Generate solution map:

```
size=10; arr = []; xShift=-1;
for (n=1; n<=size;n++) {
  xShift++;
  arr.push([xShift+1,1,10])

  for (j=1;j<=n;j++) // j is outer loop to preserve line by line reading order
    for (i=1;i<=n;i++)
      arr.push([xShift+i,1+j,10]); 

  xShift = xShift + n; 
}
JSON.stringify(arr)

```
