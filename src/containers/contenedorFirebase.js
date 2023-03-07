const admin = require('firebase-admin')
const config  = require( '../config.js')
const { loggerConsole, loggerError, loggerWarn } = require('../utils/logger')

admin.initializeApp({
  credential: admin.credential.cert(config.firebase)
});

const db = admin.firestore();

class ContainerFirebase {
  
  constructor(collection) {
    this.query = db.collection(collection)
  }

  //Create document
  async create(product) {
    try {
      const doc = this.query.doc()
      await doc.create(product)
      loggerWarn.warn("added");
      return { status: "added" }
    } catch (error) {
      loggerError.error(error);
    }
  }
  //Read All
  async getAll() {
    try {
      const queryDocs = await this.query.get()
      let docs = queryDocs.docs.map(documents => (
        { id: documents.id, ...documents.data() }
      ))
      loggerWarn.warn(docs);
      return docs
    } catch (error) {
      loggerError.error(error);
    }
  }
  //Read by ID
  async getById(id) {
    try {
      const queryDoc = this.query.doc(id)
      const doc = await queryDoc.get()
      const document = doc.data()
      return document

    } catch (error) {
      loggerError.error(error);
    }
  }
  //Update Docs
  async update(id, data) {
    try {
      const doc = this.query.doc(id)
      await doc.update(data)
      loggerWarn.warn(`documento actualizado`, data);
      return { status: "modified" }

    } catch (error) {
      loggerError.error(error);
    }
  }
  //Update Docs
  async delete(id) {
    try {
      const doc = this.query.doc(id)
      await doc.delete()
      loggerWarn.warn(`documento eliminado`);
      return { status: `${id} deleted`}

    } catch (error) {
      loggerError.error(error);
    }
  }

}

module.exports = ContainerFirebase