exports.invalid = async (req, res) => {
  return res.status(404).json({
    success: false,
    msg: 'Path not found',
  });
};
