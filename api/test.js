module.exports = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API Xarala Bootcamp fonctionne sur Vercel !',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    url: req.url,
    method: req.method
  });
}; 