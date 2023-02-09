export default class Node{
    constructor({ name, weight, x, y }) {
		this.name = name;
		this.weight = weight || 50;
		this.x = x; //Coordinate a
		this.y = y; // Coordinate b 
		this.paths = [];
	}

    insertPath(path) {
		if (this.paths.some(p => p.toNodeName === path.toNodeName)) return;
		if (this.name === path.toNodeName) return;

		this.paths.push(path);
	}

	removeLink(toNodeName) {
		this.paths = this.paths.filter(link => link.toNodeName !== toNodeName);
	}

	move(diffX, diffY) {
		this.x += diffX;
		this.y += diffY;
	}
}