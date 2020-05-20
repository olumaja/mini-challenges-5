class SpoilTomatoes {

    constructor(grid) {
        this.grid = grid;
        this.colLength = 0;
        this.rowLength = 0;
        this.getAdjacents = this.getAdjacents.bind(this)
    };

    getRottenTomatoes() {
        const locationOfSpoiltTomatoes = [];
        let numGoodTomatoe = 0;
        for (let row = 0; row < this.grid.length; row++) {
            this.rowLength = this.grid.length - 1;
            for (let col = 0; col < this.grid[row].length; col++) {
                this.colLength = this.grid[row].length - 1;
                if (this.grid[row][col] === 2) {
                    locationOfSpoiltTomatoes.push([row, col])
                }
                if (this.grid[row][col] === 1) {
                    numGoodTomatoe++
                }
            }
        }
        return { numGoodTomatoe, locationOfSpoiltTomatoes };
    }

    getAdjacents(position) {
        const [row, column] = position;
        const topAdjacent = row === 0 ? false : [row - 1, column];
        const rightAdjacent = column === this.colLength ? false : [row, column + 1];
        const bottomAdjacent = row === this.rowLength ? false : [row + 1, column];
        const leftAdjacent = column === 0 ? false : [row, column - 1]
        return [topAdjacent, rightAdjacent, bottomAdjacent, leftAdjacent]
            .filter(Boolean)
            .filter(([row, col]) => this.grid[row][col] === 1)
    }

    getTimeOfSpread(spoiltTomatoesLocations, numGoodTomatoe) {

        if (!spoiltTomatoesLocations.length) {
            return -1
        }
        const visited = {};
        let counter = -1;
        let queue = [];
        const numOfBadTomatoes = spoiltTomatoesLocations.length;
        queue.push(...spoiltTomatoesLocations)

        while (queue.length) {
            counter++
            let arrOfBadTomatoes = [...queue];
            queue.length = 0;
            for (let i = 0; i < arrOfBadTomatoes.length; i++) {
                let badTomatoe = arrOfBadTomatoes[i];
                if (!visited[badTomatoe]) {
                    visited[badTomatoe] = true;
                    const adjacentTomatoes = this.getAdjacents(badTomatoe);
                    queue.push(...adjacentTomatoes)
                    queue = queue.filter(a => !visited[a])
                }
            }

        }

        return (Object.keys(visited).length < (numGoodTomatoe + numOfBadTomatoes)) ? -1 : counter
    }

}

module.exports = SpoilTomatoes;