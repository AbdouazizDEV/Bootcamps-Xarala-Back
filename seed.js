const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./dist/app.module');
const { getRepositoryToken } = require('@nestjs/typeorm');
const { Admin } = require('./dist/database/entities/admin.entity');
const { Bootcamp } = require('./dist/database/entities/bootcamp.entity');
const { Lead } = require('./dist/database/entities/lead.entity');

async function runSeeds() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const adminRepository = app.get(getRepositoryToken(Admin));
    const bootcampRepository = app.get(getRepositoryToken(Bootcamp));
    const leadRepository = app.get(getRepositoryToken(Lead));

    // Seed Admin
    console.log('🌱 Création de l\'admin...');
    const admin = adminRepository.create({
      email: 'admin@xarala.com',
      password: 'admin123',
      name: 'Admin Xarala',
      isActive: true,
    });
    await adminRepository.save(admin);
    console.log('✅ Admin créé avec succès');

    // Seed Bootcamps
    console.log('🌱 Création des bootcamps...');
    const bootcamps = [
      {
        title: 'Développement Web Full-Stack',
        description: 'Apprenez à développer des applications web modernes avec React, Node.js et PostgreSQL. Ce bootcamp vous donnera toutes les compétences nécessaires pour devenir un développeur full-stack.',
        duration: '12 semaines',
        price: 150000,
        nextSession: new Date('2024-03-01'),
        isActive: true,
      },
      {
        title: 'Data Science & Machine Learning',
        description: 'Maîtrisez les concepts de data science et de machine learning avec Python, Pandas, Scikit-learn et TensorFlow. Découvrez comment extraire des insights précieux des données.',
        duration: '16 semaines',
        price: 200000,
        nextSession: new Date('2024-04-15'),
        isActive: true,
      },
      {
        title: 'Mobile Development avec React Native',
        description: 'Développez des applications mobiles cross-platform avec React Native. Apprenez à créer des apps performantes pour iOS et Android avec une seule base de code.',
        duration: '10 semaines',
        price: 120000,
        nextSession: new Date('2024-05-01'),
        isActive: true,
      },
    ];

    const savedBootcamps = [];
    for (const bootcampData of bootcamps) {
      const bootcamp = bootcampRepository.create(bootcampData);
      const savedBootcamp = await bootcampRepository.save(bootcamp);
      savedBootcamps.push(savedBootcamp);
    }
    console.log('✅ Bootcamps créés avec succès');

    // Seed Leads
    console.log('🌱 Création des leads...');
    const leads = [
      {
        name: 'Fatou Diop',
        email: 'fatou.diop@example.com',
        phone: '+221701234567',
        message: 'Je suis très intéressée par le bootcamp de développement web. Pouvez-vous me donner plus d\'informations sur les prérequis ?',
        bootcampId: savedBootcamps[0].id,
      },
      {
        name: 'Moussa Diallo',
        email: 'moussa.diallo@example.com',
        phone: '+221702345678',
        message: 'Bonjour, j\'aimerais m\'inscrire au bootcamp Data Science. Y a-t-il des bourses disponibles ?',
        bootcampId: savedBootcamps[1].id,
      },
      {
        name: 'Aissatou Ba',
        email: 'aissatou.ba@example.com',
        phone: '+221703456789',
        message: 'Je souhaite développer des applications mobiles. Le bootcamp React Native est-il adapté pour les débutants ?',
        bootcampId: savedBootcamps[2].id,
      },
    ];

    for (const leadData of leads) {
      const lead = leadRepository.create(leadData);
      await leadRepository.save(lead);
    }
    console.log('✅ Leads créés avec succès');

    console.log('\n🎉 Seeds terminés avec succès !');
    console.log('\n📋 Données créées :');
    console.log('- 1 Admin (admin@xarala.com / admin123)');
    console.log('- 3 Bootcamps');
    console.log('- 3 Leads');

  } catch (error) {
    console.error('❌ Erreur lors de l\'exécution des seeds:', error);
  } finally {
    await app.close();
  }
}

runSeeds(); 