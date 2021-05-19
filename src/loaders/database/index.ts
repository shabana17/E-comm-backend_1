import mongoose from 'mongoose';

mongoose.set('debug', true);
const databaseLoader = async () => new Promise<any>((resolve, reject) => {
  mongoose.connect(String('mongodb+srv://shabana_admin:9935468272@cluster0.iejbn.mongodb.net/Sheizz?retryWrites=true&w=majority'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then(db => {
      console.log('Database connection established');
      resolve(db);
    })
    .catch(reject);
});

export { databaseLoader };
