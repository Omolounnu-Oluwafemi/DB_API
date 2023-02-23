import { db } from "../db.js";

export const recent = (req, res) => {
    const q = "SELECT * FROM recentactivities";
    db.query(q, (err, data) => {
      res.send(data)
    });
  };
export const projects = (req, res) => {
    const q = "SELECT * FROM projects";
    db.query(q, (err, data) => {
      res.send(data)
    });
  };

export const users = (req, res) => {
    const q = "SELECT * FROM users";
    db.query(q, (err, data) => {
      res.send(data)
    });
  };


export const message = (req, res) => {
    const q = "SELECT * FROM users";

    db.query(q, (err, data) => {
      // console.log(data);
      res.send(data)
    });
  };

export const viewprofile = (req, res) => {
  const id = req.params.id
    const q = "SELECT * FROM users WHERE id = ?";
    db.query(q, [id], (err, data) => {
      if (err) return res.send(err);
      return res.status(200).json(data[0]);
    });                                                                                                                                             
  };

  