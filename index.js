
var canvas = $('canvas#mm').get(0);
var context = canvas.getContext('2d');

context.font = "bold 12px sans-serif";


var molecules = []
Chem.load_molecule(
    6140, 30, 200,
    function(molecule) {molecules.push(molecule); }
);
/*
Chem.load_molecule(
    6141, 300, 100,
    function(molecule) {molecules.push(molecule); }
);
*/

var update = function(dt) {
    for (var i in molecules) {
        var molecule = molecules[i];
        for (var j in molecule.atoms) {
            var atom = molecule.atoms[j];
            atom.accel.x = 0;
            atom.accel.y = 0;
        }
    }

    for (var i in molecules) {
        var molecule = molecules[i];
        for (var j in molecule.atoms) {
            var atom0 = molecule.atoms[j];
            var x0 = atom0.coords.x;
            var y0 = atom0.coords.y;
            for (var k in atom0.bonds) {
                var bond = atom0.bonds[k];
                var atom1 = molecule.atoms[bond.id];
                var x1 = atom1.coords.x;
                var y1 = atom1.coords.y;

                var dx = x1 - x0;
                var dy = y1 - y0;
                var dist = Math.sqrt(dx*dx + dy*dy);
                var nx = dx / dist;
                var ny = dy / dist;
                var accel = (dist - bond.dist) * 100;

                atom0.accel.x += nx * accel;
                atom0.accel.y += ny * accel;
                atom1.accel.x -= nx * accel;
                atom1.accel.y -= ny * accel;
            }

            /*
            for (var k in molecule.atoms) {
                if (k <= j) continue;
                var atom1 = molecule.atoms[k];

                var x1 = atom1.coords.x;
                var y1 = atom1.coords.y;

                var dx = x1 - x0;
                var dy = y1 - y0;
                var dist = Math.sqrt(dx*dx + dy*dy);
                var nx = dx / dist;
                var ny = dy / dist;
                var accel = -dist * dist / 100;

                atom0.accel.x += nx * accel;
                atom0.accel.y += ny * accel;
                atom1.accel.x -= nx * accel;
                atom1.accel.y -= ny * accel;
            }
            */
        }
    }

    for (var i in molecules) {
        var molecule = molecules[i];
        for (var j in molecule.atoms) {
            var atom = molecule.atoms[j];
            atom.vel.x += atom.accel.x * dt;
            atom.vel.y += atom.accel.y * dt;
            atom.coords.x += atom.vel.x * dt;
            atom.coords.y += atom.vel.y * dt;
        }
    }
};

var draw = function() {

    // Clears the canvas, and dynamically sizes it to window
    canvas.width = $('body').width();
    canvas.height = $('body').height();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#efefef";
    context.fill();

    // Loop through and draw all atoms
    for (var i in molecules) {
        var molecule = molecules[i];

        for (var j in molecule.atoms) {
            var atom = molecule.atoms[j];

            var x = molecule.coords.x + atom.coords.x * 40;
            var y = molecule.coords.y + atom.coords.y * 40;

            for (var k in atom.bonds) {
                var bond = atom.bonds[k];
                var atom1 = molecule.atoms[bond.id];
                var x1 = molecule.coords.x + atom1.coords.x * 40;
                var y1 = molecule.coords.y + atom1.coords.y * 40;
                context.beginPath();
                context.moveTo(x, y);
                context.lineTo(x1, y1);
                context.lineWidth = 4;
                context.strokeStyle = '#777';
                context.stroke();
            }

            context.beginPath();
            context.arc(x, y, 8, 0, Math.PI * 2, false);
            context.closePath();
            context.fillStyle = "#777";
            context.fill();

            context.fillStyle = "#efefef";
            context.textAlign = "center";
            context.fillText(atom.element, x, y+2);
        }
    }

};

var run = function() {

    update(1/100);

    draw();

    setTimeout(function() { run(); }, 1/100);
};

run();


/*
// Matter.js module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create a Matter.js engine
var engine = Engine.create({
    render: {
        element: $('body').get(0),
        options: {
            width: $('body').width(),
            height: $('body').height(),
            background: '#fafafa',
            wireframeBackground: '#fafafa',
            hasBounds: false,
            enabled: true,
            wireframes: true,
            showSleeping: true,
            showDebug: false,
            showBroadphase: false,
            showBounds: false,
            showVelocity: false,
            showCollisions: false,
            showAxes: false,
            showPositions: false,
            showAngleIndicator: false,
            showIds: false,
            showShadows: false
        }
    }
});

engine.world.gravity.y = 0;

// create two boxes and a ground
Chem.load(6140, engine.world, $('body').width()/2, $('body').height()/2);
*/

/*
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [boxA, boxB, ground]);
*/

// run the engine
//Engine.run(engine);