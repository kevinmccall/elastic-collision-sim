import { IRectangle, IPoint } from "./interfaces";

function getRightSide(rect: IRectangle) {
    return rect.x + rect.width;
}

function getBottomSide(rect: IRectangle) {
    return rect.y + rect.height;
}

function resizeCanvas(canvas: HTMLCanvasElement) {
    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight - 10;
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

function isPointInRect(point: IPoint, rect: IRectangle) {
    return rect.x < point.x && point.x < getRightSide(rect) && rect.y < point.y && point.y < getBottomSide(rect);
}

function AABB(rect1: IRectangle, rect2: IRectangle) {
    return (
        rect1.x < getRightSide(rect2) &&
        getRightSide(rect1) > rect2.x &&
        rect1.y < getBottomSide(rect2) &&
        getBottomSide(rect1) > rect2.y
    );
}

export { getBottomSide, getRightSide, resizeCanvas, getRandomInt, isPointInRect, AABB };
