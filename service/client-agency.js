const Client = require("../model/client");
const Agency = require("../model/agency");
const consola = require("consola");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");

const createAgencyAndClients = async (clientAndAgencyDetails, res) => {
  try {
    consola.info({
      message: `Incoming Request to create Agency And Clients...`,
      badge: true,
    });

    let token = null;
    if (
      clientAndAgencyDetails.agency &&
      Object.keys(clientAndAgencyDetails.agency).length > 0
    ) {
      const isAgencyExists = await Agency.findOne({
        agencyId: clientAndAgencyDetails.agency.agencyId,
      }).lean();

      if (isAgencyExists) {
        throw new Error("Agency already exists.");
      }

      const newAgency = new Agency(clientAndAgencyDetails.agency);

      await newAgency.save();
    }

    if (
      clientAndAgencyDetails.client &&
      Object.keys(clientAndAgencyDetails.client).length > 0
    ) {
      const isClientExists = await Client.findOne({
        clientId: clientAndAgencyDetails.client.clientId,
      }).lean();

      if (isClientExists) {
        throw new Error("Client already exists.");
      }

      const checkIfAgencyExists = await Agency.findOne({
        agencyId: clientAndAgencyDetails.client.agencyId,
      }).lean();

      if (!checkIfAgencyExists) {
        throw new Error("Agency doesnot exists. please create agency.");
      }

      const newClients = new Client(clientAndAgencyDetails.client);
      await newClients.save();

      token = jwt.sign(
        {
          clientId: clientAndAgencyDetails.client.clientId,
          email: clientAndAgencyDetails.client.email,
          phoneNo: clientAndAgencyDetails.client.phoneNo,
        },
        SECRET,
        { expiresIn: "7 days" }
      );
    }

    return res.status(200).json({
      message: "client/agency created successfully.",
      success: true,
      accessToken: `Bearer ${token}`,
    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(409).json({
        message: `${
          Object.keys(err.keyValue)[0]
        } already exists. Try with another.`,
        success: false,
      });
    }
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const updateClient = async (clientId, clientDetails, res) => {
  try {
    consola.info({
      message: `Incoming Request to update client...`,
      badge: true,
    });
    const clientExists = await Client.findOne({ clientId: clientId }).lean();
    if (!clientExists) {
      throw new Error("client does not exists.");
    }

    const updatedClient = await Client.updateOne(
      {
        clientId: clientId,
      },
      {
        $set: clientDetails,
      }
    );

    if (updatedClient && updatedClient.modifiedCount > 0) {
      return res.status(200).json({
        message: "client data updated successfully.",
        success: true,
      });
    } else {
      throw new Error("failed to update client data.");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const getTopClient = async (req, res) => {
  try {
    consola.info({
      message: `Incoming Request to get top clients...`,
      badge: true,
    });
    const topClient = await Client.findOne()
      .sort({ totalBill: -1 })
      .limit(1)
      .lean();
    const agencyOfTopClient = await Agency.findOne(
      { agencyId: topClient.agencyId },
      { name: 1 }
    ).lean();

    const topClients = await Client.find({
      agencyId: topClient.agencyId,
      totalBill: topClient.totalBill,
    });

    const clientData = topClients.map((client) => {
      return {
        AgencyName: agencyOfTopClient.name,
        ClientName: client.name,
        TotalBill: client.totalBill,
      };
    });

    return res.status(200).json({
      success: true,
      data: clientData || [],
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
module.exports = { createAgencyAndClients, updateClient, getTopClient };
