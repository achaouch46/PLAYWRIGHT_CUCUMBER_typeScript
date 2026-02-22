#!/usr/bin/env node
const { execSync } = require('child_process');
const path = require('path');

// Récupère les arguments passés en ligne de commande
// slice(2) pour prendre tous les arguments après "npm run test:tnr --"
const args = process.argv.slice(2);

// Parse les arguments simples --TAGS et --BROWSER
let TAGS = null;
let BROWSER = null;
let ENV = null;

console.log('📋 Arguments reçus:', args);

args.forEach(arg => {
  if (arg.startsWith('--TAGS=')) {
    TAGS = arg.split('=')[1];
    console.log('✅ TAGS trouvé:', TAGS);
  }
  if (arg.startsWith('--BROWSER=')) {
    BROWSER = arg.split('=')[1];
    console.log('✅ BROWSER trouvé:', BROWSER);
  }
  if (arg.startsWith('--ENV=')) {
    ENV = arg.split('=')[1];
    console.log('✅ ENV trouvé:', ENV);
  }
});

// Vérifie qu'un TAG est fourni
if (!TAGS) {
  console.error('❌ Aucun TAG fourni. Utilise --TAGS=@tag');
  console.error('   Exemple: npm run test:tnr -- --TAGS=@AA');
  process.exit(1);
}

// Détermine le nombre de workers (priorité à MAX_WORKERS, sinon 4 par défaut)
let maxWorkers = process.env.MAX_WORKERS || 4;

// Valeurs par défaut
const browserValue = BROWSER || 'chrome';
const envValue = ENV || 'prod';

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📌 Configuration des tests:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🏷️  TAGS :', TAGS);
console.log('🌐 BROWSER :', browserValue);
console.log('🌍 ENV :', envValue);
console.log('👤 Workers :', maxWorkers);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━\n');

try {
  // Construire la commande
  const cmd = [
    'cross-env',
    `ENV=${envValue}`,
    `FORCE_COLOR=0`,
    `BROWSER=${browserValue}`,
    'npx cucumber-js',
    `--config=config/cucumber.js`,
    `--parallel ${maxWorkers}`,
    `--tags "${TAGS}"`
  ].join(' ');

  console.log('🚀 Commande exécutée :');
  console.log('   ' + cmd + '\n');
  
  // Exécuter les tests
  execSync(cmd, { 
    stdio: 'inherit',
    env: { 
      ...process.env, 
      ENV: envValue,
      BROWSER: browserValue
    }
  });

  console.log('\n✅ Tests terminés avec succès\n');

} catch (err) {
  console.error('\n❌ Erreur lors de l’exécution des tests');
  console.error('   ', err.message);
  process.exit(1);
}