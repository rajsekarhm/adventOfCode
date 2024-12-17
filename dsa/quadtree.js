class QuadTree {
    constructor(boundary, maxPoints = 4) {
        // Area this quadrant covers
        this.boundary = {
            x: boundary.x,
            y: boundary.y,
            width: boundary.width,
            height: boundary.height
        };

        // Maximum points allowed in this quadrant
        this.maxPoints = maxPoints;

        // Items stored in this quadrant
        this.items = [];

        // Flag to show if this quadrant is divided
        this.divided = false;

        // Four child quadrants
        this.northwest = null;
        this.northeast = null;
        this.southwest = null;
        this.southeast = null;
    }

    // Check if a location is inside this quadrant
    contains(location) {
        return (
            location.x >= this.boundary.x - this.boundary.width &&
            location.x < this.boundary.x + this.boundary.width &&
            location.y >= this.boundary.y - this.boundary.height &&
            location.y < this.boundary.y + this.boundary.height
        );
    }

    // Divide this quadrant into four smaller quadrants
    subdivide() {
        const x = this.boundary.x;
        const y = this.boundary.y;
        const w = this.boundary.width / 2;
        const h = this.boundary.height / 2;

        // Create four smaller quadrants
        this.northwest = new QuadTree({
            x: x - w/2,
            y: y - h/2,
            width: w,
            height: h
        });

        this.northeast = new QuadTree({
            x: x + w/2,
            y: y - h/2,
            width: w,
            height: h
        });

        this.southwest = new QuadTree({
            x: x - w/2,
            y: y + h/2,
            width: w,
            height: h
        });

        this.southeast = new QuadTree({
            x: x + w/2,
            y: y + h/2,
            width: w,
            height: h
        });

        this.divided = true;
    }

    // Insert a location into the quadrant
    insert(location) {
        // If location is not in this quadrant, return false
        if (!this.contains(location)) {
            return false;
        }

        // If there's space, add the location
        if (this.items.length < this.maxPoints) {
            this.items.push(location);
            return true;
        }

        // If quadrant is full, split it
        if (!this.divided) {
            this.subdivide();
        }

        // Try to insert into child quadrants
        return (
            this.northwest.insert(location) ||
            this.northeast.insert(location) ||
            this.southwest.insert(location) ||
            this.southeast.insert(location)
        );
    }

    // Search for locations in a specific area
    query(area) {
        const foundLocations = [];

        // If the search area doesn't overlap with this quadrant, return empty
        if (!this.intersects(area)) {
            return foundLocations;
        }

        // Check items in this quadrant
        for (let item of this.items) {
            if (this.isInArea(item, area)) {
                foundLocations.push(item);
            }
        }

        // If not divided, return found items
        if (!this.divided) {
            return foundLocations;
        }

        // Recursively search child quadrants
        foundLocations.push(
            ...this.northwest.query(area),
            ...this.northeast.query(area),
            ...this.southwest.query(area),
            ...this.southeast.query(area)
        );

        return foundLocations;
    }

    // Check if search area intersects with this quadrant
    intersects(area) {
        return !(
            area.x - area.width > this.boundary.x + this.boundary.width ||
            area.x + area.width < this.boundary.x - this.boundary.width ||
            area.y - area.height > this.boundary.y + this.boundary.height ||
            area.y + area.height < this.boundary.y - this.boundary.height
        );
    }

    // Check if a location is in the search area
    isInArea(location, area) {
        return (
            location.x >= area.x - area.width &&
            location.x < area.x + area.width &&
            location.y >= area.y - area.height &&
            location.y < area.y + area.height
        );
    }
}

// Demonstration
function demonstrateQuadTree() {
    // Create a main area (think of it like a map)
    const mainArea = {
        x: 0,
        y: 0,
        width: 100,
        height: 100
    };

    // Create a Quad Tree for this area
    const quadTree = new QuadTree(mainArea);

    // Sample locations
    const locations = [
        { x: 25, y: 25, name: "Cafe" },
        { x: 75, y: 75, name: "Restaurant" },
        { x: 50, y: 50, name: "Park" },
        { x: 10, y: 90, name: "Library" },
        { x: 90, y: 10, name: "School" }
    ];

    // Insert locations into the Quad Tree
    locations.forEach(location => {
        quadTree.insert(location);
    });

    // Search for locations in a specific area
    const searchArea = {
        x: 40,
        y: 40,
        width: 20,
        height: 20
    };

    const foundLocations = quadTree.query(searchArea);
    console.log("Locations in search area:", foundLocations);
}

// Run the demonstration
demonstrateQuadTree();