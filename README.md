# Polynomial Secret Solver

This project implements a simplified version of **Shamir's Secret Sharing Algorithm** to reconstruct a polynomial from given points and determine the constant term `c` (the secret). The solution supports decoding values in different bases and detecting incorrect points on the polynomial curve.

## Features

- **Decode Base Values**: Parses and decodes `y` values provided in various numerical bases.
- **Lagrange Interpolation**: Uses Lagrange interpolation to reconstruct the polynomial from given points.
- **Detect Wrong Points**: Identifies imposter points that do not lie on the polynomial curve (for the second test case).

## Project Files

- **polynomialSolver.js**: The main script to read JSON input, decode the values, and calculate the polynomial's constant term using Lagrange interpolation.
- **input1.json**: First test case file containing 4 points.
- **input2.json**: Second test case file containing 9 points, with potential wrong points.

## How to Run

1. Clone the repository and navigate to the project directory.
2. Ensure that Node.js is installed on your system.
3. Run the script using the command:

   ```bash
   node polynomialSolver.js

