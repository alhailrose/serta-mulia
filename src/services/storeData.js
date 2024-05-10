import { Firestore } from "@google-cloud/firestore";

const storeData = async (data, id) => {
    const db = new Firestore({});

    const predicCollection = db.collection("predic");
    return predicCollection.doc(id).set(data);
};

export default storeData;
