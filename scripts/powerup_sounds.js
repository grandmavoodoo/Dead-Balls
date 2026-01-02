// powerup_sounds.js
// Handles all power-up pickup sounds

// 🔒 GLOBAL LOCK (PREVENT SOUND SPAM)
let powerupSoundLock = false;
const POWERUP_SOUND_COOLDOWN = 700; // ms

const powerupSounds = {
  INSTA: new Audio('assets/powerups/sounds/insta_kill.mp3'),
  NUKE: new Audio('assets/powerups/sounds/nuke.mp3'),
  '2X': new Audio('assets/powerups/sounds/double_points.mp3'),
  MAX: new Audio('assets/powerups/sounds/max_ammo.mp3'),
  CARPENTER: new Audio('assets/powerups/sounds/carpenter.mp3'),
  DEATH: new Audio('assets/powerups/sounds/death_machine.mp3')
};

// Optional: consistent volume
for (const s of Object.values(powerupSounds)) {
  s.volume = 0.6;
}

function playPowerupSound(type) {
  if (!powerupSounds[type]) return;

  const sfx = powerupSounds[type].cloneNode();

  // ✅ APPLY BOTH MASTER + POWERUP VOLUME
  const master = window.MASTER_VOLUME ?? 1;
  const power = window.powerupVolume ?? 1;

  sfx.volume = master * power;

  sfx.play();
}


// expose globally
window.playPowerupSound = playPowerupSound;
