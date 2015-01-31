var World = Matter.World,
            Bodies = Matter.Bodies;

var Chem = {
    load: function(cid, world, x, y) {

        // Create a physics body corresponding to an atom
        var instantiate_atom = function(atom) {
            var scale = 20;
            var body = Bodies.circle(
                atom.coords.x*scale + x, atom.coords.y*scale + y, 2);
            World.add(world, body);
            atom['body'] = body;
            return atom;
        }

        // Create a "covalent bond" between two atoms
        var bond_atoms = function(atom_0, atom_1) {

            // TODO: Do stuff
        }

        // Using compound structural data, generate the physical object
        var instantiate_molecule = function(compound) {
            console.log("Instantiating compound");
            console.log(compound);

            // Instantiate all atoms and save them in a dict
            var atoms = {}
            var atom_ids = compound.atoms.aid;
            var atom_elements = compound.atoms.element;
            var atom_coords_x = compound.coords[0].conformers[0].x;
            var atom_coords_y = compound.coords[0].conformers[0].y;
            for (var i = 0; i < atom_ids.length; i++) {
                atom = {
                    'element': atom_elements[i],
                    'coords': {
                        'x': atom_coords_x[i],
                        'y': atom_coords_y[i],
                    }
                };
                atoms[atom_ids[i]] = instantiate_atom(atom);
            };

            // Create covalent (spring) bonds between atoms
            var atom_bond_1_ids = compound.bonds.aid1
            var atom_bond_2_ids = compound.bonds.aid2
            var atom_bond_orders = compound.bonds.order
            for (var i = 0; i < atom_bond_1_ids.length; i++) {
                var id1 = atom_bond_1_ids[i];
                var id2 = atom_bond_2_ids[i];
                bond_atoms(atoms[id1], atoms[id2]);
            }

            // Return the collection of atoms
            return atoms;
        };

        // Make an AJAX call to the pubchem database
        // to get all the info on the compound.
        console.log("Making ajax call...");
        $.ajax('http://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/' + cid + '/JSON?record_type=2d', {
            type: 'GET',
            dataType: 'json',
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            },
            success: function(data, textStatus, jqXHR) {
                console.log("Compound Loaded (CID: " + cid + ")");
                atoms = instantiate_molecule(data.PC_Compounds[0]);
            }
        });
    },
}