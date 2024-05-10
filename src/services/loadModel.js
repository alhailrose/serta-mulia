import tf from "@tensorflow/tfjs-node";

export const loadModel = async () => {
    return tf.loadGraphModel(process.env.MODEL_URL);
};
