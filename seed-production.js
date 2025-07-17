const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./dist/app.module');
const { getRepository } = require('typeorm');
const bcrypt = require('bcrypt');

async function seedProduction() {
  console.log('🌱 Démarrage du seeding pour la production...');
  
  const app = await NestFactory.createApplicationContext(AppModule);
  const adminRepository = getRepository('Admin');
  const bootcampRepository = getRepository('Bootcamp');
  const leadRepository = getRepository('Lead');

  try {
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
    console.log('\n🔗 Endpoints disponibles:');
    console.log('- GET / - Page d\'accueil');
    console.log('- GET /api/health - Health check');
    console.log('- POST /api/auth/login - Connexion admin');
    console.log('- GET /api/bootcamps - Liste des bootcamps');
    console.log('- POST /api/leads - Créer un lead');
    console.log('- GET /api/docs - Documentation Swagger');

  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error);
    throw error;
  } finally {
    await app.close();
  }
}

// Exécuter le seeding si le script est appelé directement
if (require.main === module) {
  seedProduction()
    .then(() => {
      console.log('✅ Seeding terminé');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Erreur:', error);
      process.exit(1);
    });
}

module.exports = { seedProduction }; 