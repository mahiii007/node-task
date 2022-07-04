const router = require("express").Router();
const {
  createAgencyAndClients,
  updateClient,
  getTopClient,
} = require("../service/client-agency");

const { authenticateToken } = require("../middleware/auth");
//agency and client creation
router.post("/", async (req, res) => {
  await createAgencyAndClients(req.body, res);
});

//update client details
router.put("/:clientId", authenticateToken, async (req, res) => {
  await updateClient(req.params.clientId, req.body, res);
});

//get top clients
router.get("/topclients", authenticateToken, async (req, res) => {
  await getTopClient(req, res);
});

module.exports = router;
