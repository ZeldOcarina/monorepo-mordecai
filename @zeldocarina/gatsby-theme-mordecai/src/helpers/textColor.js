const runNetwork = function anonymous(input
) {
    var net = { "layers": [{ "r": {}, "g": {}, "b": {} }, { "0": { "bias": 9.211083753847813, "weights": { "r": -6.161600957488559, "g": -16.846468950945255, "b": 7.234574252055646 } }, "1": { "bias": 4.521764592146227, "weights": { "r": -7.725999178768325, "g": 3.1890889985379745, "b": -0.18277412939410487 } }, "2": { "bias": 6.062095545722863, "weights": { "r": -4.048123160732909, "g": -11.436220796485792, "b": 4.49391971316036 } } }, { "black": { "bias": 7.178734328103585, "weights": { "0": -12.45871343617562, "1": -4.9965418820041, "2": -7.465355186136904 } } }], "outputLookup": true, "inputLookup": true };

    for (var i = 1; i < net.layers.length; i++) {
        var layer = net.layers[i];
        var output = {};

        for (var id in layer) {
            var node = layer[id];
            var sum = node.bias;

            for (var iid in node.weights) {
                sum += node.weights[iid] * input[iid];
            }
            output[id] = (1 / (1 + Math.exp(-sum)));
        }
        input = output;
    }
    return output;
}

const textColor = function (bgColor) {
    var output = runNetwork(bgColor)
    if (output.black > 0.5) {
        return "black"
    }
    return "white"
}

export default textColor;