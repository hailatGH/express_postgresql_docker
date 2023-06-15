const { error } = require("console");
const {
  models: { Sample },
} = require("../models");

module.exports = {
  // Create route handler
  create: async (req, res) => {
    try {
      try {
        const { sampleName } = req.body;
        res.status(201).json(await Sample.create({ sampleName }));
      } catch (error) {
        res.status(500).json({ error: `Internal server error, ${error}` });
      }
    } catch (error) {
      res.status(500).send({
        error: `Could not create the sample, ${error}`,
      });
    }
  },

  // List route handler
  list: async (req, res) => {
    try {
      const samples = await Sample.findAll();

      if (!samples) {
        return res.status(404).json({ error: "Samples not found" });
      }

      res.json(samples);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Get route handler
  get: async (req, res) => {
    try {
      const { id } = req.params;
      const sample = await Sample.findByPk(id);

      if (!sample) {
        return res.status(404).json({ error: "Sample not found" });
      }

      res.json(sample);
    } catch (error) {
      res.status(500).json({ error: `Internal server error, ${error}` });
    }
  },

  // Update route handler
  update: async (req, res) => {
    try{
      try {
        const { id } = req.params;
        const { sampleName } = req.body;
        const sample = await Sample.findByPk(id);
       
        if (!sample) {
          return res.status(404).json({ error: "Sample not found" });
        }
  
        sample.sampleName = sampleName;
        res.status(201).json(await sample.save());
      } catch (error) {
        res.status(500).json({ error: `Internal server error, ${error}` });
      }
    } catch (error) {
      res.status(500).send({
        error: `Could not update the sample, ${error}`,
      });
    }
  },

  // Destroy route handler
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const sample = await Sample.findByPk(id);

      if (!sample) {
        return res.status(404).json({ error: "Sample not found" });
      }

      await sample.destroy();
      res.json({ message: "Sample deleted successfully" }); 
    } catch (error) {
      res.status(500).json({ error: `Internal server error, ${error}` });
    }
  },
};
