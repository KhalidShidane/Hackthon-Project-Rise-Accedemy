const createCrudController = (Model, resourceName) => {
  const create = async (req, res) => {
    try {
      const item = await Model.create(req.body);
      res.status(201).json({ message: `${resourceName} created successfully`, item });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const read = async (req, res) => {
    try {
      const items = await Model.find();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const getsingle = async (req, res) => {
    try {
      if (!Model.base.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid ID" });
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ message: `${resourceName} not found` });
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const update = async (req, res) => {
    try {
      if (!Model.base.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid ID" });
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!item) return res.status(404).json({ message: `${resourceName} not found` });
      res.status(200).json({ message: `${resourceName} updated successfully`, item });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const deleteItem = async (req, res) => {
    try {
      if (!Model.base.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid ID" });
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ message: `${resourceName} not found` });
      res.status(200).json({ message: `${resourceName} deleted successfully` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  return { create, read, getsingle, update, deleteItem };
};

module.exports = createCrudController;
