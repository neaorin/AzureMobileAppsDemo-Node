var azureMobileApps = require('azure-mobile-apps'),
promises = require('azure-mobile-apps/src/utilities/promises'),
logger = require('azure-mobile-apps/src/logger');

var table = azureMobileApps.table();

// // Define the columns within the table
// table.columns = {
//     "createdAt": "date",
//     "updatedAt": "date",
//     "text": "string",
//     "complete": "boolean"
// };

// // Turn off dynamic schema
// table.dynamicSchema = false;

// // Require authentication to access the table
// table.access = 'authenticated';


// table.read(function (context) {
//     return context.execute();
// });


// READ - only return records belonging to the authenticated user
// table.read(function (context) {
//    context.query.where({ userId: context.user.id });
//    return context.execute();
//  });


// table.update(function (context) {
//     return context.execute();
// });

// table.delete(function (context) {
//     return context.execute();
// });

table.insert(function (context) {

    logger.info('Running TodoItem.insert');

    // Define the template payload.
    var payload = '{"messageParam": "New item: ' + context.item.text + '"}'; 

    // Execute the insert.  The insert returns the results as a Promise,
    // Do the push as a post-execute action within the promise flow.
    return context.execute()
        .then(function (results) {
            // Only do the push if configured
            if (context.push) {
                // Send a template notification.
                context.push.send(null, payload, function (error) { //context.user.id or "manager"
                    if (error) {
                        logger.error('Error while sending push notification: ', error);
                    } else {
                        logger.info('Push notification sent successfully!');
                    }
                });
            }
            // Don't forget to return the results from the context.execute()
            return results;
        })
        .catch(function (error) {
            logger.error('Error while running context.execute: ', error);
        });
});

module.exports = table;  
