/*
var World = Matter.World,
            Bodies = Matter.Bodies;
*/

var Chem = {
    //load: function(cid, world, x, y) {
    load_molecule: function(cid, x, y, success) {

        // Create a "covalent bond" between two atoms
        var bond_atoms = function(atom_0, atom_1) {

            // Get the bond distance
            var dx = atom_1.coords.x - atom_0.coords.x;
            var dy = atom_1.coords.y - atom_0.coords.y;
            var dist = Math.sqrt(dx*dx + dy*dy);

            // Store the bond in the one with the lower id
            if (atom_0.id < atom_1.id) {
                atom_0.bonds.push({
                    'id': atom_1.id,
                    'dist': dist});
            } else {
                atom_1.bonds.push({
                    'id': atom_0.id,
                    'dist': dist});
            }
        }

        // Using compound structural data, generate the physical object
        var instantiate_molecule = function(compound) {
            console.log("Instantiating compound");
            //console.log(compound);

            // Instantiate all atoms and save them in a dict
            var atoms = {}
            var atom_ids = compound.atoms.aid;
            var atom_elements = compound.atoms.element;
            var atom_coords_x = compound.coords[0].conformers[0].x;
            var atom_coords_y = compound.coords[0].conformers[0].y;
            for (var i = 0; i < atom_ids.length; i++) {
                atom = {
                    'id': atom_ids[i],
                    'element': atom_elements[i],
                    'bonds': [],
                    'coords': {
                        'x': atom_coords_x[i],
                        'y': atom_coords_y[i]},
                    'vel': {
                        'x': 0,
                        'y': 0},
                    'accel': {
                        'x': 0,
                        'y': 0},
                };
                //atoms[atom_ids[i]] = instantiate_atom(atom);
                atoms[atom_ids[i]] = atom;
            };

            // Create covalent (spring) bonds between atoms
            var atom_bond_1_ids = compound.bonds.aid1
            var atom_bond_2_ids = compound.bonds.aid2
            var atom_bond_orders = compound.bonds.order
            for (var i = 0; i < atom_bond_1_ids.length; i++) {
                var id1 = atom_bond_1_ids[i];
                var id2 = atom_bond_2_ids[i];
                var bond = bond_atoms(atoms[id1], atoms[id2]);
            }


            // Return the collection of atoms
            return {
                'atoms': atoms,
                'coords': {
                    'x': x,
                    'y': y,
                }
            };
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
                molecule = instantiate_molecule(data.PC_Compounds[0]);

                // Add the molecule to the molecules array
                //molecules.push(molecule);
                //console.log(molecules);

                // Call the success callback function
                success(molecule);
            }
        });
    },
}