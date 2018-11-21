import * as mongoose from 'mongoose'

class Db {
  url

  connect() {
    this.url =
      'mongodb://facebook-clone-db:facebook-clone-1@ds139436.mlab.com:39436/facebook-clone-db'

    mongoose
      .connect(this.url)
      .then(() => console.log('connected db'))
      .catch(() => console.log('connected error'))
  }
}

export default new Db().connect
