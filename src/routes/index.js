const express = require('express');
const router = express.Router();
const Task = require('../model/task');

router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.render('index', {
    tasks
  });
});


router.get('/list', async (req, res) => {
  const tasks = await Task.find();
  res.render('list', {
    tasks
  });
});

router.get('/print.ejs', async (req, res) => {
  const tasks = await Task.find();
  res.render('print', {
    tasks
  });
});

router.get('/images/n1.png', async (req, res) => {
  const tasks = await Task.find();
  res.render('views/images/n1.png', {
    tasks
  });
});
// routes of products

router.get('/products-1/:id', async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  console.log(task)
  res.render('add', { task });
});

router.post('/products-2/:id', async (req, res, next) => {
  const { id } = req.params;
  await Task.update({_id: id}, req.body);
  res.redirect('/list');
});



router.post('/add', async (req, res, next) => {
  const task = new Task(req.body);
  await task.save();
  res.redirect('/');
});

router.get('/turn/:id', async (req, res, next) => {
  let { id } = req.params;
  const task = await Task.findById(id);
  task.status = !task.status;
  await task.save();
  res.redirect('/');
});

router.get('/edit/:id', async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  console.log(task)
  res.render('edit', { task });
});

router.post('/edit/:id', async (req, res, next) => {
  const { id } = req.params;
  await Task.update({_id: id}, req.body);
  res.redirect('/list');
});


// ROutes Or Print


router.get('/print1/:id', async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  console.log(task)
  res.render('print.ejs', { task });
});

router.post('/print2/:id', async (req, res, next) => {
  const { id } = req.params;
  await Task.update({_id: id}, req.body);
  res.redirect('/');
});
 //final

router.get('/delete/:id', async (req, res, next) => {
  let { id } = req.params;
  await Task.remove({_id: id});
  res.redirect('/list');
});


module.exports = router;
