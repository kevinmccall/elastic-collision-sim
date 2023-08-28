// function testAABB() {
//     {
//         let rectangle1: IRectangle = {
//             x: 0,
//             y: 0,
//             width: 5,
//             height: 5,
//         };
//         let rectangle2: IRectangle = {
//             x: 10,
//             y: 10,
//             width: 5,
//             height: 5,
//         };
//         if (AABB(rectangle1, rectangle2) == true) {
//             console.log("failed test 1");
//         }
//     }
//     {
//         let rectangle1: IRectangle = {
//             x: 0,
//             y: 0,
//             width: 5,
//             height: 5,
//         };
//         let rectangle2: IRectangle = {
//             x: 10,
//             y: 10,
//             width: 5,
//             height: 5,
//         };
//         if (AABB(rectangle2, rectangle1) == true) {
//             console.log("failed test 2");
//         }
//     }
//     {
//         let rectangle1: IRectangle = {
//             x: 0,
//             y: 10,
//             width: 5,
//             height: 5,
//         };
//         let rectangle2: IRectangle = {
//             x: 10,
//             y: 0,
//             width: 5,
//             height: 5,
//         };
//         if (AABB(rectangle1, rectangle2) == true) {
//             console.log("failed test 3");
//         }
//     }
//     {
//         let rectangle1: IRectangle = {
//             x: 0,
//             y: 10,
//             width: 5,
//             height: 5,
//         };
//         let rectangle2: IRectangle = {
//             x: 10,
//             y: 0,
//             width: 5,
//             height: 5,
//         };
//         if (AABB(rectangle2, rectangle1) == true) {
//             console.log("failed test 4");
//         }
//     }
// }

// function testInit() {
//     const CALEB1 = new BouncyObject("https://erakijeff.github.io/5head.webp", CALEB_WIDTH, CALEB_HEIGHT);
//     const WALLOFFSET = 250;
//     const SPEED_MULTIPLYER = 4;
//     CALEB1.x = WALLOFFSET;
//     CALEB1.y = 400;
//     CALEB1.vx = CALEB_MIN_SPEED * SPEED_MULTIPLYER;
//     const CALEB2 = new BouncyObject("https://erakijeff.github.io/caleb.webp", CALEB_WIDTH, CALEB_HEIGHT);
//     CALEB2.x = canvas.width - WALLOFFSET - CALEB2.width;
//     CALEB2.y = 400;
//     CALEB2.vx = -CALEB_MIN_SPEED * SPEED_MULTIPLYER;
//     CALEB2.mass = 10;
//     drawnObjects.push(CALEB1);
//     drawnObjects.push(CALEB2);
// }

// function testInit2() {
//     const CALEB1 = new BouncyObject("https://erakijeff.github.io/5head.webp", CALEB_WIDTH, CALEB_HEIGHT);
//     const WALLOFFSET = 250;
//     CALEB1.x = WALLOFFSET;
//     CALEB1.y = 200;
//     const CALEB2 = new BouncyObject("https://erakijeff.github.io/caleb.webp", CALEB_WIDTH, CALEB_HEIGHT);
//     CALEB2.x = CALEB1.x + 10;
//     CALEB2.y = CALEB1.y + 51;

//     drawnObjects.push(CALEB1);
//     drawnObjects.push(CALEB2);
//     // add mouse testing
//     //document.addEventListener("mousemove", (ev) => {
//     //     CALEB2.x = ev.x;
//     //     CALEB2.y = ev.y;
//     // });
// }

// testAABB();
// testInit();
