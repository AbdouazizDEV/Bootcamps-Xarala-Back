const { createConnection } = require('typeorm');
const bcrypt = require('bcrypt');

async function seedProductionSimple() {
  console.log('🌱 Démarrage du seeding simplifié pour la production...');
  
  // Configuration de base de données
  const databaseUrl = process.env.DATABASE_URL;
  const nodeEnv = process.env.NODE_ENV || 'development';
  
  console.log(`🌍 Environnement: ${nodeEnv}`);
  console.log(`🔗 DATABASE_URL disponible: ${!!databaseUrl}`);
  
  if (!databaseUrl) {
    throw new Error('DATABASE_URL est requise pour le seeding en production');
  }
  
  // Configuration TypeORM
  const connection = await createConnection({
    type: 'postgres',
    url: databaseUrl,
    entities: [__dirname + '/dist/database/entities/*.entity.js'],
    synchronize: false,
    logging: true,
    ssl: { rejectUnauthorized: false },
  });
  
  console.log('✅ Connexion à la base de données établie');
  
  try {
    // Récupérer les repositories
    const adminRepository = connection.getRepository('Admin');
    const bootcampRepository = connection.getRepository('Bootcamp');
    const leadRepository = connection.getRepository('Lead');
    
    // Vérifier si l'admin existe déjà
    const existingAdmin = await adminRepository.findOne({ where: { email: 'admin@xarala.sn' } });
    
    if (!existingAdmin) {
      console.log('👤 Création de l\'administrateur par défaut...');
      
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      const admin = adminRepository.create({
        email: 'admin@xarala.sn',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'Xarala',
        role: 'admin',
      });
      
      await adminRepository.save(admin);
      console.log('✅ Administrateur créé avec succès');
      console.log('📧 Email: admin@xarala.sn');
      console.log('🔑 Mot de passe: admin123');
    } else {
      console.log('ℹ️  L\'administrateur existe déjà');
    }

    // Vérifier si des bootcamps existent déjà
    const existingBootcamps = await bootcampRepository.count();
    
    if (existingBootcamps === 0) {
      console.log('🎓 Création des bootcamps de démonstration...');
      
      const bootcamps = [
        {
          title: 'Développement Web Full-Stack',
          description: 'Apprenez à créer des applications web modernes avec les dernières technologies. Ce bootcamp couvre HTML, CSS, JavaScript, React, Node.js et plus encore.',
          startDate: new Date('2024-03-01'),
          endDate: new Date('2024-06-01'),
          price: 150000,
          maxStudents: 20,
          currentStudents: 0,
          status: 'active',
          imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500',
        },
        {
          title: 'Data Science & IA',
          description: 'Maîtrisez les fondamentaux de la data science et de l\'intelligence artificielle. Python, machine learning, deep learning et analyse de données.',
          startDate: new Date('2024-04-01'),
          endDate: new Date('2024-07-01'),
          price: 200000,
          maxStudents: 15,
          currentStudents: 0,
          status: 'active',
          imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500',
        },
        {
          title: 'Mobile Development',
          description: 'Développez des applications mobiles natives et cross-platform. React Native, Flutter, et les meilleures pratiques du développement mobile.',
          startDate: new Date('2024-05-01'),
          endDate: new Date('2024-08-01'),
          price: 180000,
          maxStudents: 18,
          currentStudents: 0,
          status: 'active',
          imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500',
        },
      ];

      for (const bootcampData of bootcamps) {
        const bootcamp = bootcampRepository.create(bootcampData);
        await bootcampRepository.save(bootcamp);
      }
      
      console.log('✅ Bootcamps créés avec succès');
    } else {
      console.log(`ℹ️  ${existingBootcamps} bootcamp(s) existent déjà`);
    }

    // Créer quelques leads de démonstration
    const existingLeads = await leadRepository.count();
    
    if (existingLeads === 0) {
      console.log('📝 Création de leads de démonstration...');
      
      const leads = [
        {
          firstName: 'Fatou',
          lastName: 'Diop',
          email: 'fatou.diop@example.com',
          phone: '+221701234567',
          status: 'pending',
          source: 'website',
          notes: 'Intéressée par le développement web',
        },
        {
          firstName: 'Moussa',
          lastName: 'Sall',
          email: 'moussa.sall@example.com',
          phone: '+221701234568',
          status: 'contacted',
          source: 'social_media',
          notes: 'A des questions sur les prérequis',
        },
        {
          firstName: 'Aissatou',
          lastName: 'Ba',
          email: 'aissatou.ba@example.com',
          phone: '+221701234569',
          status: 'enrolled',
          source: 'referral',
          notes: 'Inscrite au bootcamp Data Science',
        },
      ];

      for (const leadData of leads) {
        const lead = leadRepository.create(leadData);
        await leadRepository.save(lead);
      }
      
      console.log('✅ Leads créés avec succès');
    } else {
      console.log(`ℹ️  ${existingLeads} lead(s) existent déjà`);
    }

    console.log('🎉 Seeding terminé avec succès !');
    console.log('\n📋 Informations de connexion:');
    console.log('👤 Email: admin@xarala.sn');
    console.log('🔑 Mot de passe: admin123');

  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error);
    throw error;
  } finally {
    await connection.close();
  }
}

// Exécuter le seeding si le script est appelé directement
if (require.main === module) {
  seedProductionSimple()
    .then(() => {
      console.log('✅ Seeding simplifié terminé');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Erreur:', error);
      process.exit(1);
    });
}

module.exports = { seedProductionSimple }; 