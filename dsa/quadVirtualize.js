class Boundary {
    constructor(x, y, width, height) {
        this.x = x;         // Center x-coordinate
        this.y = y;         // Center y-coordinate
        this.width = width; // Half-width of the boundary
        this.height = height; // Half-height of the boundary
    }

    // Improved visualization method
    visualize() {
        console.log("Boundary Visualization:");
        console.log(`Center: (${this.x}, ${this.y})`);
        console.log(`Horizontal Range: ${this.x - this.width} to ${this.x + this.width}`);
        console.log(`Vertical Range: ${this.y - this.height} to ${this.y + this.height}`);
        
        // Create a fixed-size grid
        const gridSize = 20;
        const grid = Array(gridSize).fill().map(() => Array(gridSize).fill('.'));
        
        // Calculate grid coordinates (adjust scaling as needed)
        const gridX = Math.floor(gridSize / 2);
        const gridY = Math.floor(gridSize / 2);
        const gridWidth = Math.floor(this.width / 10);
        const gridHeight = Math.floor(this.height / 10);
        
        // Mark the boundary area
        for (let dy = -gridHeight; dy <= gridHeight; dy++) {
            for (let dx = -gridWidth; dx <= gridWidth; dx++) {
                const y = gridY + dy;
                const x = gridX + dx;
                
                if (y >= 0 && y < gridSize && x >= 0 && x < gridSize) {
                    grid[y][x] = 'X';
                }
            }
        }
        
        // Mark the center
        grid[gridY][gridX] = 'O';
        
        // Print the grid
        console.log("Boundary Grid (O = Center, X = Boundary Area):");
        grid.forEach(row => console.log(row.join(' ')));
    }

    contains(point) {
        return (
            point.x >= this.x - this.width && 
            point.x < this.x + this.width && 
            point.y >= this.y - this.height && 
            point.y < this.y + this.height
        );
    }
}

// Create a boundary
const boundary = new Boundary(100, 200, 50, 30);

// Visualize the boundary
boundary.visualize();

// Test some points
const testPoints = [
    { x: 75, y: 185 },   // Inside
    { x: 50, y: 170 },   // Edge
    { x: 151, y: 200 },  // Outside
];

console.log("\nPoint Containment Test:");
testPoints.forEach(point => {
    console.log(`Point (${point.x}, ${point.y}) is ${boundary.contains(point) ? 'INSIDE' : 'OUTSIDE'} the boundary`);
});