function spawnBouncyObject(
    x: number,
    y: number,
    width?: number,
    height?: number,
    mass?: number,
    img?: string,
    vx?: number,
    vy?: number
) {
    if (width === undefined) {
        width = CALEB_WIDTH;
    }
    if (height === undefined) {
        height = CALEB_HEIGHT;
    }
    if (mass === undefined) {
        mass = CALEB_STARTING_MASS;
    }
    if (img === undefined) {
        img = CALEB_THONK_IMG_PATH;
    }
    if (vx === undefined) {
        vx = CALEB_MAX_SPEED * Math.random();
        if (getRandomInt(2) === 1) {
            vx *= -1;
        }
    }
    if (vy === undefined) {
        vy = CALEB_MAX_SPEED * Math.random();
        if (getRandomInt(2) === 1) {
            vy *= -1;
        }
    }
    const caleb = new BouncyObject(img, width, height, mass);

    drawnObjects.push(caleb);
}
