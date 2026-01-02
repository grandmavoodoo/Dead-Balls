// guns.js
// Central gun registry for the entire game

// guns.js
// Central gun registry for the entire game

function defineGun(name, config) {
  return {
    name,
    damage: config.damage,
    fireRate: config.fireRate,
    mag: config.mag,
    magMax: config.mag,
    reserve: config.reserve,
    reserveMax: config.reserve,

    // ✅ RELOAD SYSTEM
    reload: config.reload,   // ← rename for clarity
    reloadTimer: 0,
    reloading: false,

    bulletSpeed: config.speed,
    auto: config.auto ?? true,
    cooldown: 0,
    cost: config.cost ?? 0,

    // ===== UPGRADE DATA =====
    upgradeLevel: 0,
    baseDamage: config.damage,
    baseReserveMax: config.reserve,
    upgradeCost: 5000
  };
}

function upgradeGun(gun) {
  if (!gun || gun.upgradeCost == null) return;

  gun.upgradeLevel++;

  const mult = Math.pow(1.5, gun.upgradeLevel);

  gun.damage = Math.round(gun.baseDamage * mult);
  gun.reserveMax = Math.round(gun.baseReserveMax * mult);

  // refill ammo safely
  gun.mag = gun.magMax;
  gun.reserve = gun.reserveMax;

  gun.upgradeCost = Math.round(gun.upgradeCost * 1.2);
}

// expose globally
window.upgradeGun = upgradeGun;


// Guns available in the mystery box
const MYSTERY_BOX_GUNS = [
  defineGun('SMG', {
    damage: 28,
    fireRate: 10,
    mag: 30,
    reserve: 180,
    reload: 2.0,
    speed: 650,
    auto: true
  }),

  defineGun('AR', {
    damage: 32,
    fireRate: 6,
    mag: 25,
    reserve: 150,
    reload: 2.0,
    speed: 700,
    auto: true
  }),

  defineGun('Shotgun', {
    damage: 50,
    fireRate: 1,
    mag: 8,
    reserve: 48,
    reload: 5.5,
    speed: 600,
    auto: false
  }),

  defineGun('LMG', {
    damage: 35,
    fireRate: 8,
    mag: 60,
    reserve: 240,
    reload: 4.5,
    speed: 700,
    auto: true
  }),

  defineGun('Sniper', {
    damage: 120,
    fireRate: 1.5,
    mag: 5,
    reserve: 30,
    reload: 2.2,
    speed: 1000,
    auto: false
  }),

  defineGun('M1 SUS', {
    damage: 45,
    fireRate: 2,
    mag: 10,
    reserve: 50,
    reload: 3.5,
    speed: 750,
    auto: false
  }),

  // 🔥 ADD NEW GUNS HERE 🔥
  defineGun('Ray Gun', {
    damage: 120,
    fireRate: 3,
    mag: 20,
    reserve: 120,
    reload: 2.8,
    speed: 900,
    auto: true
  })
];
