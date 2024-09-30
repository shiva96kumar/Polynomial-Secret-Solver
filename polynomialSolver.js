const fs = require('fs');

// Function to decode a value from a given base
const decodeValue = (base, value) => {
    return parseInt(value, base);
};

// Function to perform Lagrange interpolation
const lagrangeInterpolation = (points) => {
    const n = points.length;

    // Function to calculate Lagrange basis polynomial Li(x)
    const lagrangeBasis = (i, x) => {
        let numerator = 1;
        let denominator = 1;

        for (let j = 0; j < n; j++) {
            if (i !== j) {
                numerator *= (x - points[j].x);
                denominator *= (points[i].x - points[j].x);
            }
        }
        return numerator / denominator;
    };

    // Compute the polynomial at x = 0 (constant term)
    let constantTerm = 0;
    for (let i = 0; i < n; i++) {
        constantTerm += points[i].y * lagrangeBasis(i, 0);
    }
    return constantTerm;
};

// Function to check wrong points (for second test case)
const detectWrongPoints = (points, k) => {
    const correctPoints = [];
    const wrongPoints = [];

    // Try fitting with k points, check the remaining
    for (let i = 0; i < points.length; i++) {
        const testPoints = points.filter((_, idx) => idx !== i);
        const constantTerm = lagrangeInterpolation(testPoints);

        if (Math.round(lagrangeInterpolation(testPoints)) === Math.round(points[i].y)) {
            correctPoints.push(points[i]);
        } else {
            wrongPoints.push(points[i]);
        }
    }

    return wrongPoints;
};

// Function to process the input and solve for the secret
const solveSecret = (filename) => {
    const data = JSON.parse(fs.readFileSync(filename, 'utf8'));

    const n = data.keys.n;
    const k = data.keys.k;

    const points = [];

    // Decode the points
    for (let i = 1; i <= n; i++) {
        if (data[i]) {
            const x = parseInt(i);
            const y = decodeValue(data[i].base, data[i].value);
            points.push({ x, y });
        }
    }

    // Find the secret (constant term)
    const secret = lagrangeInterpolation(points.slice(0, k));

    console.log(`Secret for ${filename}:`, Math.round(secret));

    // Check for wrong points in the second test case
    if (filename === 'input2.json') {
        const wrongPoints = detectWrongPoints(points, k);
        if (wrongPoints.length > 0) {
            console.log(`Wrong points in ${filename}:`, wrongPoints);
        } else {
            console.log(`No wrong points in ${filename}.`);
        }
    }
};

// Solve for the test cases
solveSecret('input1.json');
solveSecret('input2.json');
