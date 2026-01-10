// scripts/player_info.js
// ===============================
// PLAYER PROFILE (PERSISTENT)
// ===============================

const PLAYER_INFO_KEY = 'sus_zombies_player_info';

function getExpForLevel(level) {
  return Math.floor(420 * Math.pow(1.35, level - 1));
}

window.PlayerInfo = {
  level: 1,
  exp: 0,
  expToNext: getExpForLevel(1),

  load() {
    const raw = localStorage.getItem(PLAYER_INFO_KEY);
    if (!raw) return;

    try {
      const data = JSON.parse(raw);
      this.level = data.level ?? 1;
      this.exp = data.exp ?? 0;
      this.expToNext = getExpForLevel(this.level);
    } catch (e) {
      console.warn('Failed to load player info');
    }
  },

  save() {
    localStorage.setItem(
      PLAYER_INFO_KEY,
      JSON.stringify({
        level: this.level,
        exp: this.exp
      })
    );
  },

  addExp(amount) {
    if (!Number.isFinite(amount) || amount <= 0) return;

    this.exp += amount;

    while (this.exp >= this.expToNext) {
      this.exp -= this.expToNext;
      this.level++;
      this.expToNext = getExpForLevel(this.level);
    }

    this.save();

    if (typeof updatePlayerExpUI === 'function') {
      updatePlayerExpUI();
    }
  },

  // ✅ RESET FUNCTION (THIS WAS MISSING)
  reset() {
    this.level = 1;
    this.exp = 0;
    this.expToNext = getExpForLevel(1);

    localStorage.removeItem(PLAYER_INFO_KEY);
    this.save();

    if (typeof updatePlayerExpUI === 'function') {
      updatePlayerExpUI();
    }

    console.log('Player progression reset');
  }
};

// auto-load on startup
PlayerInfo.load();
