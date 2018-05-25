Function.prototype.construct = function(argArray) { 
    //Unpacks arrays into a constructor arguments
    var constr = this;
    var inst = Object.create(constr.prototype);
    constr.apply(inst, argArray);
    return inst;
};