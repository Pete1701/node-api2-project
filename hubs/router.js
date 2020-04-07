const express = require("express");

const Hubs = require("./db.js");

const router = express.Router();


router.get("/", (req, res) => {
  Hubs.find(req.query)
    .then((hubs) => {
      res.status(200).json({ queryString: req.query, hubs });
    })
    .catch((error) => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "The posts information could not be retrieved.s",
      });
    });
});

router.get("/:id", (req, res) => {
  Hubs.findById(req.params.id)
    .then((hub) => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((error) => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the post",
      });
    });
});

router.get("/:id/comments", (req, res) => {
  Hubs.findPostComments(req.params.id)
    .then((hub) => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: "Comment not found" });
      }
    })
    .catch((error) => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the comment",
      });
    });
});

router.post("/", (req, res) => {
  Hubs.insert(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      res.status(500).json({
        message: "There was an error while saving the post to the database",
      });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Hubs.remove(id)
    .then((count) => {
      if (count) {
        res.status(200).json({ message: "hub deleted" });
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json({ error: "The post could not be removed" });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;

  console.log("changes:", changes);

  Hubs.update(req.params.id, changes)
    .then((count) => {
      if (count) {
        Hubs.findById(req.params.id)
          .then((post) => {
            res.status(200).json(post);
          })
          .catch((err) => {
            res
              .status(500)
              .json({ errorMessage: "Error reading the updated post" });
          });
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((error) => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "The post information could not be modified.",
      });
    });
});


// router.get("/:id/messages", (req, res) => {
//   Hubs.findHubMessages(req.params.id)
//     .then((messages) => {
//       res.status(200).json(messages);
//     })
//     .catch((err) => {
//       res.status(500).json({ errorMessage: "error reading messages" });
//     });
// });


router.post("/:id/comments", (req, res) => {
  Hubs.insertComment(req.body)
    .then((comment) => {
      res.status(201).json(comment);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: "There was an error while saving the comment to the database" });
    });
});

module.exports = router;
