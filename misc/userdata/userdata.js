var facebook = require('./facebook.json'),
aad = require('./aad.json'),
google = require('./google.json'),
microsoftaccount = require('./microsoftaccount.json'),
twitter = require('./twitter.json');

console.log(facebook.facebook.claims.name);
console.log(aad.aad.claims.givenname + ' '+aad.aad.claims.surname);
console.log(google.google.claims.name);
console.log(microsoftaccount.microsoftaccount.claims.name);
console.log(twitter.twitter.claims.name);
