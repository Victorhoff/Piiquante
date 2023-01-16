const modelSauce = require('../models/Sauce');
const fs = require('fs');

exports.getAllSauces = (req, res, next) => {
  modelSauce.find()
      .then(response => res.status(200).json(response))
      .catch(error => res.status(400).json({error}))
};

exports.getOneSauce = (req, res, next) => {
  modelSauce.findOne({_id: req.params.id})
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(400).json({error}))
};

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new modelSauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  }); 
  sauce.save()
      .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
      .catch(error => {
          res.status(400).json({ error });
      });console.log(sauce)
};

exports.modifySauce = (req, res, next) => {
  if (req.file) {
      modelSauce.findOne({ _id: req.params.id })
          .then(sauce => {
              const filename = sauce.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                  const sauceObject = {
                      ...JSON.parse(req.body.sauce),
                      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                  }
                  modelSauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                      .then(() => res.status(200).json({ message: 'Sauce modifiée!' }))
                      .catch(error => res.status(400).json({ error }));
              })
          })
          .catch(error => res.status(500).json({ error }));
  } else {
      const sauceObject = { ...req.body };
      modelSauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce modifiée!' }))
          .catch(error => res.status(400).json({ error }));
  }
};

exports.deleteSauce = (req, res, next) => {
  modelSauce.findOne({_id: req.params.id})
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];

    fs.unlink(`images/${filename}`, () => {
  modelSauce.deleteOne({_id: req.params.id})
    .then(()=> res.status(200).json({ message: 'Sauce supprimée'}))
    .catch(error => res.status(400).json({ error}))
  });
})
};

exports.likeSauce = function (req, res, next) {
  modelSauce.findOne({ _id: req.params.id })
    .then(function (likedSauce) {
      switch (req.body.like) {
        case +1:
          if (!likedSauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {
            modelSauce.updateOne({ _id: req.params.id },
              {
                $inc: { likes: 1 }, $push: { usersLiked: req.body.userId }
              })
              .then(() => res.status(201).json({ message: 'Vous aimez cette sauce'}))
              .catch(error => {
                  res.status(400).json({ error });
              });
          }
          break;
        case -1:
          if (!likedSauce.usersDisliked.includes(req.body.userId) && req.body.like === -1) {
            modelSauce.updateOne({ _id: req.params.id },
              { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId }, }
            )
            .then(() => res.status(201).json({ message: "Vous n'aimez pas cette sauce"}))
            .catch(error => {
                res.status(400).json({ error });
            });
          }
          break;
        case 0:
          if (likedSauce.usersLiked.includes(req.body.userId)) {
            modelSauce.updateOne({ _id: req.params.id },
              { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId }, }
            )
            .then(() => res.status(201).json({ message: "Vous n'aimez plus cette sauce"}))
            .catch(error => {
                res.status(400).json({ error });
            });
          }
          if (likedSauce.usersDisliked.includes(req.body.userId)) {
            modelSauce.updateOne(
              { _id: req.params.id },
              { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId }, }
            )
            .then(() => res.status(201).json({ message: ''}))
            .catch(error => {
                res.status(400).json({ error });
            });
          }
          break;
      }
    })
    .catch(function (error) {
      res.status(404).json({ error: error });
    });
};