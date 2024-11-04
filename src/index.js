// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

/*{
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
      street: string,
      suite: string,
      city: string,
      zipcode: string,
      geo: {
        lat: string,
        lng: string
      }
    },
    phone: string,
    website: string,
    company: {
      name: string,
      catchPhrase: string,
      bs: string
    }
}
 */
async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3
  };
  //obj to construct the result
  let result = {}
  try {
    const databasetoquery = await central(id);
    // get the funtion to call from the dictionary database based on tthe id
    const queryDatabase = dbs[databasetoquery];
    const results = await Promise.all([queryDatabase(id), vault(id)]);
    // objects returned by db1--db3 have nested objects -- >structuredClone to make a deep copy
    let result = structuredClone(results[0]);
    //vault returns a simple object --> csn use spread to clone it 
    result = { ...results[1] }
    //adding the id key: value
    result['id'] = id;
    console.log(result);
  }
  catch {
    console.log('Error Fetching user');
  }
  return new Promise ((resolve, reject)=>{
    resolve(result);
    reject(Error);
  })
}

getUserData(3);