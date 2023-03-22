import admin from "firebase-admin";

const keys = {
  type: "service_account",
  project_id: "bloggingbackend",
  private_key_id: "934ddc487ee5b8fc4fad541d5ef5929be8d3f9fc",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCzxV2ASSamWKFn\nUuuvpbXGYIJhsBCcuD+Tejd01UlauGyUngQQqkadiluFQhpnTPsDkpSvYMeimCeJ\nRlj8kMRmKKkvN46IMSe+LhnTq1JzUenfR8HtiIq20wwxErTMBZgnaspXAlkDQJxB\n+BelqJJx9jrMK8me3688aZLxxXTBcYF1Aod9kQPqvJjExF6Z3F4T81FrA3IxRLhB\nb31dXSIdv3+npCdJ3gm4A6j3rU06LW+q8j6WbudLkodqDMu8TGCW+yHE/vPCplw5\nvijkPvm6t150XA/piq3K7Z6WeHkDrGQUrzHThz1SaNXQDchMBNR2WvT/vI7/w6nX\nVDAk3T9DAgMBAAECggEAERNRI0tPeYN3qUnOCzwRPQuTttWzbj9uAoMcW2Oa+RwF\nbERqHG8gD/zBXrH9sgw0140HxHTL4ZzUPIzLDQpvLUj1cP+08SjCHqVgXKOsTDne\nng/B0t8iVeVMBilBtRNe9XeGSqd1bwKnFPkMvfZ6GosJ4LTUDNwwV+urQn2/7lPB\n23oaXBkwcqbCGc1Q67FJwKBk0nthhVprR9jVJOfZJg/mWs0r5u86pgL6HeLIROzH\n2AwS+XEp00fuNAPZGtSNKgQHV7PDvA6+pbDmJ026DKrhkVkr3Ds2DLj/KRPDHTkE\nT9SCcAVTd+UJWMkxAJoIBjrZ2fJuMjKAqf1RiShUwQKBgQDnCedIvqxMGgDxkvmE\ns1D2C0t47R13GmmoaQwv+p5POvSb7zqSk2zPbNwXoi5YRTUz0eTi/9mMiRhlO7oN\nZblR7yWYQ9W8JRYlNJK/H9I71Of0CrR67huG3h3pp97hUYNjyIgLHSP70AURoxjZ\n9XP3FsCv7p4B0WDipUP+enlmYQKBgQDHMX4dd7m4cFQnJqFoucBbP2LnDhKPRZNb\nF5dy0d02aS92gYfcWODwYgkBxiPcFrCQM4eJquSsNYMpNymyQsQ+DH+8l5xOh3Wz\npo+OxWAkps9ydrOp+vAQ2AqkmkG+JeENbCe3SMz3hGzYSvScWCsY1CeR+l2r9Scn\nPf119CxAIwKBgBwUQwy/R7d0DZtOjo7HMFbG5qRKxSL9jcvPAJEwN19PvfzZpVe9\nHSNUiqdAqbtGpgGnR9ci2zDOVK2xBZqtO0mu8/W+gNJ9+2QIMLGTz3xAEvTA/FBY\ncfYBNsd4BImD26Eb9RTMtNvc21DabqHGyBJGrKJ1MLTt2oWRKmNaRTjhAoGBAMNw\njhr/k5uhqw/W2VvVlSRyZunpZtBoJZKk7RXdT7zJK6aMpO7PzbRNnCS/cgPJx2dV\nB9FNeZx1zMEtvJ2I4N84iERURSrPwe6IqCYfBpwvhy75xIItEkqUjqy+JW8Z31y6\nF6W/qkvZBKqbsLGN2Is97a1PB4VmvgnEyuFmt9wdAoGAVuhBY5lncuhpFRHELj2m\nThURTPzdb+Y6+wgQhKpuVOWliiSvVo/eY52XXuPDa7p2aziuOjoQCKs706XDP+SP\nzTSWhRA5iJaE54rFX/Oahds/Zo/ABlvEkQL1FpGDnpN+0/1HgZtEs3dwqnBw3glP\n6mZ68ldBZeFxIo4qP/89FYw=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-49nub@bloggingbackend.iam.gserviceaccount.com",
  client_id: "110735008151624252642",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-49nub%40bloggingbackend.iam.gserviceaccount.com",
};
class Firestore {
  constructor() {
    this.app = admin.initializeApp({
      credential: admin.credential.cert(keys),
    });
    this.db = admin.firestore();
  }

  f_pathToCollectionOrDoc(path) {
    var strings = [];
    path.split("/").map((item) => {
      if (item != "") {
        strings.push(item);
      }
    });
    var loc = this.db.collection(strings[0]);
    for (var i = 1; i < strings.length; i++) {
      if (i % 2 != 0) {
        loc = loc.doc(strings[i]);
      } else {
        loc = loc.collection(strings[i]);
      }
    }
    return loc;
  }

  async f_saveDoc(collectionPath, doc) {
    await this.f_pathToCollectionOrDoc(collectionPath).doc().set(doc);
  }
  async f_deleteDoc(collectionPath, id) {
    await this.f_pathToCollectionOrDoc(collectionPath).doc(id).delete();
  }
  async f_updateDoc(collectionPath, id, updatedData) {
    await this.f_pathToCollectionOrDoc(collectionPath)
      .doc(id)
      .update(updatedData);
  }

  async f_getDoc(path, id = "*") {
    var data;
    var jsonData={};
    try {
      if (id === "*") {
        data = await this.f_pathToCollectionOrDoc(path).get();
      } else {
        data = [await this.f_pathToCollectionOrDoc(path).doc(id).get()];
      }
      data.forEach(doc => {
        jsonData[doc.id] = doc.data();
      });
    } catch (error) {
      data = {"error" : "data not found"}
    }
    return jsonData;
  }
}

const firestore = new Firestore();

export default firestore;
