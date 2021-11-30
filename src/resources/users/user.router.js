const {getAll} = require('./user.service');

// router.route('/').get(async (req, res) => {
//   const users = await usersService.getAll();
//   // map user fields to exclude secret fields like "password"
//   res.json(users.map(User.toResponse));
// });

// module.exports = router;

function itemRoutes(app, options, done) {
  // Get all items
  app.get('/users', getAll)

  // // Get single items
  // app.get('/items/:id', getItemOpts)

  // // Add item
  // app.post('/items', postItemOpts)

  // // Delete item
  // app.delete('/items/:id', deleteItemOpts)

  // // Update item
  // app.put('/items/:id', updateItemOpts)

  done()
}

module.exports = itemRoutes