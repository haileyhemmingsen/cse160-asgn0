let canvas, ctx;    //initialize global scope

function main() {
    // Retrieve <canvas> element <- (1)
    canvas = document.getElementById('cnv1');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }
    
    // Get the rendering context for 2DCG <- (2)
    ctx = canvas.getContext('2d');
    
    // Draw a blue rectangle <- (3)
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a black color
    // fillRect(x-coord, y-coord, width, height)
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color

    // Part 2 of Asgn0
    // let v1 = new Vector3([2.25, 2.25, 0]);
    // console.log(v1);
    // drawVector(v1, "red")
} 

function drawVector(v, color){
    //set color
    ctx.strokeStyle = color;

    //get center coords of canvas
    let cx = canvas.width / 2;
    let cy = canvas.height / 2;

    //draw vector
    ctx.beginPath();
    ctx.moveTo(cx, cy); //move to center
    ctx.lineTo(cx + v.elements[0]*20, cy - v.elements[1]*20); //offset and scale based on center
    ctx.stroke();   //actually draw the line

}

function handleDrawEvent(){
    // get v1's x and y coords
    let v1x = document.getElementById("v1x").value;
    let v1y = document.getElementById("v1y").value;
    
    let v1 = new Vector3([v1x, v1y, 0]);

    // get v2's x and y coords
    let v2x = document.getElementById("v2x").value;
    let v2y = document.getElementById("v2y").value;
    
    let v2 = new Vector3([v2x, v2y, 0]);

    // Clear canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawVector(v1, "red");
    drawVector(v2, "blue");
}

function handleDrawOperationEvent(){
    // get v1's x and y coords
    let v1x = document.getElementById("v1x").value;
    let v1y = document.getElementById("v1y").value;
    
    let v1 = new Vector3([v1x, v1y, 0]);

    // get v2's x and y coords
    let v2x = document.getElementById("v2x").value;
    let v2y = document.getElementById("v2y").value;
    
    let v2 = new Vector3([v2x, v2y, 0]);

    let sel = document.getElementById("operations").value;  //get op
    let s = document.getElementById("scalar").value;        //get scalar (if present)
    
    //declare v3 and v4 vectors (empty at first)
    let v3 = new Vector3();
    let v4 = new Vector3();
    
    //switch statement for respective operation
    switch(sel) {
        case "0": v3.add(v1);   //Add
                v3.add(v2);    
                break;
        case "1": v3.add(v1);   //Sub
                v3.sub(v2);    
                break;
        case "2": v3.add(v1);   //Mul
                v4.add(v2);
                v3.mul(s);
                v4.mul(s);
                break;
        case "3":  v3.add(v1);  //Div
                v4.add(v2);
                v3.div(s);
                v4.div(s);
                break;
        case "4":               //Mag
                console.log("Magnitude v1: ", v1.magnitude());
                console.log("Magnitude v2: ", v2.magnitude());
                break;
        case "5": v3.add(v1);   //norm
                v4.add(v2);
                v3.normalize();
                v4.normalize();
                break;
        case "6":               //angle
                const angle = angleBetween(v1, v2);
                console.log("Angle: ", angle);
                break;
        case "7":               //area
                const area = areaTriangle(v1, v2);
                console.log("Area of the triangle: ", area);
                break;
    }
    
    // Clear canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //draw vectors in respective colors
    drawVector(v1, "red");
    drawVector(v2, "blue");
    drawVector(v3, "green");
    drawVector(v4, "green");
}

function angleBetween(v1, v2) {
    const angle = Math.acos(Vector3.dot(v1, v2) / (v1.magnitude() * v2.magnitude())) * (180 / Math.PI); 
    return angle;   //in degrees
}

function areaTriangle(v1, v2) {
    const cross = Vector3.cross(v1, v2);
    const area = 0.5 * cross.magnitude(); 
    return area;
}