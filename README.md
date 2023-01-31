
# Matrix rotation problem


Given a matrix of order NxN, the task is to rotate each ring of the matrix clockwise. If any ring includes singular field, it is not moved.

## Problem

Given a matrix of order NxN, the algorithm should rotate each ring which is inside that matrix.
Ring is a set of numbers (at least 1) with the same distance from the nearest edge.

### Examples
**Matrix 2x2**

```
1 2
3 4
```

Matrix 2x2 includes only 1 ring which is the whole matrix.

**Matrix 3x3**

```
1 2 3
4 5 6
7 8 9
```

Matrix 3x3 contains 2 rings:
```
1 2 3        - - -
4 - 6        - 5 -
7 8 9        - - -
```

**Matrix 4x4**

```
1    2    3    4
5    6    7    8
9   10   11   12
13  14   15   16
```

Matrix 4x4 contains 2 rings:
```
1    2    3    4        -    -    -    -
5    -    -    8        -    6    7    -
9    -    -   12        -   10   11    -
13  14   15   16        -    -    -    -
```

Number of rings is the number of rows or columns (minimum of those values) divided by 2. In case result is not a natural number, then it should be approximate to the nearest natural number that is smaller than result.

### Rotation

Each ring should be rotated clockwise by 1 position.

### Rotation Examples
**Matrix 2x2**

There is 1 ring only, so algorithm should rotate it.

```
3 1
4 2
```

**Matrix 3x3**

However matrix 3x3 contains 2 rings, there is no need to rotate all of them. **In case ring edge length equals 1, then rotation algorithm should be skipped.**
After rotation:

```
4 1 2
7 5 3
8 9 6
```

**Matrix 4x4**

There are 2 rings, so algorithm should rotate each of them.

After 1st iteration (rotate 1st ring):

```
5    1    2    3
9    6    7    4
13  10   11    8
14  15   16   12
```

After 2nd iteration (rotate 2nd ring):
```
5    1    2    3
9   10    6    4
13  11    7    8
14  15   16   12
```

## Solution

1. For given flat array of numbers, determine number of rows and columns (the number of columns and number of rows should be same for the square matrix).
2. Determine number of rings.
3. Rotate each ring using algorithm:
- Move the first element of next row to the first position;
- Move elements of the top row (starting from the first column);
- Move elements of the last column (starting from the first row);
- Move elements of the bottom row (starting from the last column);
- Move elements of the first column (starting from the last row); 


## Building 

```
npm run install
npm run build
```

## Usage
After building the package, run algorithms by command below:
```
node cli.js input.csv > output.csv
```

The input.csv is the path to the input file. It's the first and only argument to the program.
The output.csv is the file path where the output will be saved.

### Input file structure

The input will be a CSV file with the columns id and json. ID should be a string and json to be a string (JSON encoded data).

```
id,json
1,"[1, 2, 3, 4, 5, 6, 7, 8, 9]"
2,"[40, 20, 90, 10]"
3,"[-5]"
9,"[2, -0]"
5,"[2, -5, -5]"
8,"[1, 1, 1, 1, 1]”
```

Inside `/tests` directory there are a few example input files.

## Testing
### Unit tests

To run unit tests perform command below:

```
npm run test
```
