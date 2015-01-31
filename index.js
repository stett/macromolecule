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

/*
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [boxA, boxB, ground]);
*/

// run the engine
Engine.run(engine);