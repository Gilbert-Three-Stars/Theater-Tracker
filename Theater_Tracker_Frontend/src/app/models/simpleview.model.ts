export class SimpleView {
    constructor(
        private zoom: number,
        private coords: Array<number>,
        private resolution: number
    ) {}
    getZoom(): number {
        return this.zoom
    }
    getCoords(): Array<number> {
        return this.coords;
    }
    getResolution(): number {
        return this.resolution;
    }
    printView(): void {
        console.log("Zoom: ", this.zoom.toString());
        console.log("Coordinates: ", this.coords.toString());
    }
}
