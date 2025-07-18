module.exports = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'API Xarala Bootcamp - Health Check',
      status: 'OK',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: process.env.DATABASE_URL ? 'Configurée' : 'Non configurée',
      jwt: process.env.JWT_SECRET ? 'Configuré' : 'Non configuré'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur dans health check',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}; 