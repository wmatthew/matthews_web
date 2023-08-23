# Dev Instructions

## Initial Setup
Install Node and 11ty
```
brew install node
npm install @11ty/eleventy --save-dev
```

## Core Workflow
Wipe + Regenerate + Serve + Auto-reload:
```
rm -rf ../docs && npx @11ty/eleventy --serve
```

View content locally: http://localhost:8080/

## Other Tasks
Wipe + Regenerate Content Once (but don't start server?):
```
rm -rf ../docs && npx @11ty/eleventy
```

## Pentomino Puzzle Scripts

Generate checkerboard maps (JS):
```
size=4; arr = []; for (i=1;i<=size*2;i++) { for (j=1;j<=size*3;j++) if (j<=size*2 || i<=size) arr.push([i,j,(i+j)%2-2]) }; JSON.stringify(arr)
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
