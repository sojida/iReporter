import db from '../db/db';
import {
  getAllIncidents,
  createRecord,
  getRecord,
  updateProperty,
  deleteRecord,
  updateStatus,
} from '../db/controller.queries';


async function getIncidents(req, res) {
  const { rows } = await db.query(getAllIncidents());
  res.status(200).json({
    status: 200,
    data: [...rows],
  });
}

const getMyIncidents = (req, res) => {
  res.status(200).json({
    status: 200,
    data: [...req.info],
  });
};

async function postRecord(req, res) {
  const { rows } = await db.query(createRecord(req.body.type, req.data, 'now', req.body.status, req.body.comment, req.body.title, req.body.images, req.body.videos, req.body.location));
  res.status(201).json({
    status: 201,
    record: rows[0],
    message: `${rows[0].type} record created successfully`,
  });
}

async function getReportType(req, res) {
  const { rows } = await db.query(getRecord(req.type));
  res.status(200).json({
    status: 200,
    data: [...rows],
  });
}


const getReport = (req, res) => res.status(200).json({
  status: 200,
  data: [...req.info],
});


async function patchLocation(req, res) {
  const { rows } = await db.query(updateProperty('location', req.body.location, req.type, req.params.id));

  res.status(200).json({
    status: 200,
    data: [...rows],
    message: `Updated ${rows[0].type} record location`,
  });
}


async function patchComment(req, res) {
  const { rows } = await db.query(updateProperty('comment', req.body.comment, req.type, req.params.id));

  res.status(200).json({
    status: 200,
    data: [...rows],
    message: `Updated ${rows[0].type} record comment`,
  });
}


async function deleteReport(req, res) {
  const { rows } = await db.query(deleteRecord(req.type, req.params.id, req.data));

  res.status(200).json({
    status: 200,
    data: [...rows],
    message: `Deleted ${rows[0].type} record location`,
  });
}


async function changeStatus(req, res) {
  const { rows } = await db.query(updateStatus(req.body.status, req.params.id));

  res.status(200).json({
    status: 200,
    data: [...rows],
    message: `Updated ${rows[0].type} record status`,
  });
}


module.exports = {
  getIncidents,
  postRecord,
  getReportType,
  getReport,
  patchLocation,
  patchComment,
  deleteReport,
  changeStatus,
  getMyIncidents,
};
