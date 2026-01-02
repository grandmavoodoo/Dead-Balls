// gun_sounds.js
// Centralized gun sound system (shoot + reload)

// key = gun.name EXACTLY
const GunSoundRegistry = {
  "Pistol": {
    shoot: {
      normal: "assets/gun_sounds/pistol_shoot.mp3",
      upgraded: "assets/gun_sounds/pistol_shoot_upg.mp3"
    },
    reload: {
      normal: "assets/gun_sounds/pistol_reload.mp3",
      upgraded: "assets/gun_sounds/pistol_reload_upg.mp3"
    }
  },
  "M1 SUS": {
    shoot: {
      normal: "assets/gun_sounds/m1sus_shoot.mp3",
      upgraded: "assets/gun_sounds/m1sus_shoot_upg.mp3"
    },
    reload: {
      normal: "assets/gun_sounds/m1sus_reload.mp3",
      upgraded: "assets/gun_sounds/m1sus_reload_upg.mp3"
    }
  },

  "SMG": {
    shoot: {
      normal: "assets/gun_sounds/smg_shoot.mp3",
      upgraded: "assets/gun_sounds/smg_shoot_upg.mp3"
    },
    reload: {
      normal: "assets/gun_sounds/smg_reload.mp3",
      upgraded: "assets/gun_sounds/smg_reload_upg.mp3"
    }
  },

  "AR": {
    shoot: {
      normal: "assets/gun_sounds/ar_shoot.mp3",
      upgraded: "assets/gun_sounds/ar_shoot_upg.mp3"
    },
    reload: {
      normal: "assets/gun_sounds/ar_reload.mp3",
      upgraded: "assets/gun_sounds/ar_reload_upg.mp3"
    }
  },

  "SHOTGUN": {
    shoot: {
      normal: "assets/gun_sounds/shotgun_shoot.mp3",
      upgraded: "assets/gun_sounds/shotgun_shoot_upg.mp3"
    },
    reload: {
      normal: "assets/gun_sounds/shotgun_reload.mp3",
      upgraded: "assets/gun_sounds/shotgun_reload_upg.mp3"
    }
  },

  "LMG": {
    shoot: {
      normal: "assets/gun_sounds/lmg_shoot.mp3",
      upgraded: "assets/gun_sounds/lmg_shoot_upg.mp3"
    },
    reload: {
      normal: "assets/gun_sounds/lmg_reload.mp3",
      upgraded: "assets/gun_sounds/lmg_reload_upg.mp3"
    }
  },

  "Sniper": {
    shoot: {
      normal: "assets/gun_sounds/sniper_shoot.mp3",
      upgraded: "assets/gun_sounds/sniper_shoot_upg.mp3"
    },
    reload: {
      normal: "assets/gun_sounds/sniper_reload.mp3",
      upgraded: "assets/gun_sounds/sniper_reload_upg.mp3"
    }
  },
    "Death Machine": {
    shoot: {
      normal: "assets/gun_sounds/deathmachine_shoot.mp3"
    }
  },


  "Ray Gun": {
    shoot: {
      normal: "assets/gun_sounds/raygun_shoot.mp3",
      upgraded: "assets/gun_sounds/raygun_shoot_upg.mp3"
    },
    reload: {
      normal: "assets/gun_sounds/raygun_reload.mp3",
      upgraded: "assets/gun_sounds/raygun_reload_upg.mp3"
    }
  }
};

// ---- internal cache for fast replay ----
const _soundCache = {};

// =====================
// SHOOT SOUND
// =====================
function playGunSound(gun) {
  if (!gun) return;

  const entry = GunSoundRegistry[gun.name];
  if (!entry || !entry.shoot) return;

  const src =
    gun.upgradeLevel > 0
      ? entry.shoot.upgraded
      : entry.shoot.normal;

  if (!src) return;

  let audio = _soundCache[src];
  if (!audio) {
    audio = new Audio(src);
    _soundCache[src] = audio;
  }

  const sfx = audio.cloneNode();
  sfx.volume = window.MASTER_VOLUME ?? 0.6;
  sfx.play();
}

// =====================
// RELOAD SOUND
// =====================
function playReloadSound(gun) {
  if (!gun) return;

  const entry = GunSoundRegistry[gun.name];
  if (!entry || !entry.reload) return;

  const src =
    gun.upgradeLevel > 0
      ? entry.reload.upgraded
      : entry.reload.normal;

  if (!src) return;

  const sfx = new Audio(src);
  sfx.volume = window.MASTER_VOLUME ?? 0.6;
  sfx.play();
}

// expose globally
window.playGunSound = playGunSound;
window.playReloadSound = playReloadSound;
