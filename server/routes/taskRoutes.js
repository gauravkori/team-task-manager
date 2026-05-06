const express = require("express");

const Task = require("../models/Task");

const authMiddleware =
  require("../middleware/authMiddleware");

const router = express.Router();


// CREATE TASK
router.post(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      // Only admin can create tasks
      if (
        req.user.role !== "admin"
      ) {

        return res
          .status(403)
          .json({
            message:
              "Access denied",
          });
      }

      const {
        title,
        description,
        dueDate,
        project,
        assignedTo,
      } = req.body;

      const task =
        await Task.create({
          title,
          description,
          dueDate,
          project,
          assignedTo,
          createdBy:
            req.user.id,
        });

      res.status(201).json({
        message:
          "Task created successfully",
        task,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);


// GET TASKS
router.get(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      let tasks;

      // ADMIN -> ALL TASKS
      if (
        req.user.role === "admin"
      ) {

        tasks =
          await Task.find()
            .populate(
              "project",
              "name"
            )
            .populate(
              "assignedTo",
              "name email"
            )
            .populate(
              "createdBy",
              "name email"
            );

      } else {

        // MEMBER -> ONLY OWN TASKS
        tasks =
          await Task.find({
            assignedTo:
              req.user.id,
          })
            .populate(
              "project",
              "name"
            )
            .populate(
              "assignedTo",
              "name email"
            )
            .populate(
              "createdBy",
              "name email"
            );
      }

      res.json(tasks);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);


// UPDATE TASK STATUS
router.put(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const { status } =
        req.body;

      const task =
        await Task.findById(
          req.params.id
        );

      if (!task) {

        return res
          .status(404)
          .json({
            message:
              "Task not found",
          });
      }

      // Only assigned member or admin
      if (
        task.assignedTo.toString() !==
          req.user.id &&
        req.user.role !==
          "admin"
      ) {

        return res
          .status(403)
          .json({
            message:
              "Access denied",
          });
      }

      task.status = status;

      await task.save();

      res.json({
        message:
          "Task updated successfully",
        task,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

module.exports = router;