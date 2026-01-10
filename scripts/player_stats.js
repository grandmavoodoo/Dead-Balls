// scripts/player_stats.js
// ===============================
// GLOBAL PLAYER STATS TRACKER
// (TRACKING ONLY — NEVER GAME LOGIC)
// ===============================


// PlayerStats.addPoints(pts);
// PlayerStats.addKill();
// PlayerStats.addTrapKill();
// PlayerStats.addTrapBuy();
// PlayerStats.addKill();
// PlayerStats.addUpgrade();
// PlayerStats.addDoor();
// PlayerStats.addRoundSurvived();

// EXP REWARDS (tweak freely)
const EXP_VALUES = {
  kill: 15,
  trapKill: 5,
  roundSurvived: 10,
  doorsOpened: 6,
  trapBuys: 4,
  upgrade: 35,
  downs: -50
};



window.PlayerStats = {
  // LIFETIME TRACKING ONLY
  totalPointsEarned: 0,
  kills: 0,
  upgrades: 0,
  downs: 0,
  doorsOpened: 0,
  trapKills: 0,
  trapBuys: 0,
  roundsSurvived: 0,

  reset() {
    this.totalPointsEarned = 0;
    this.kills = 0;
    this.upgrades = 0;
    this.downs = 0;
    this.doorsOpened = 0;
    this.trapBuys = 0;
    this.trapKills = 0;
    this.roundsSurvived = 0;
  },

  // 🔒 TRACKING ONLY — never touches player.points
  addPoints(v = 0) {
    if (!Number.isFinite(v)) return;
    this.totalPointsEarned += v;
  },

  addKill() {
    this.kills++;
    PlayerInfo.addExp(EXP_VALUES.kill);
  },

  addUpgrade() {
    this.upgrades++;
    PlayerInfo.addExp(EXP_VALUES.upgrade);
  },

  addDown() {
    this.downs++;
    PlayerInfo.addExp(EXP_VALUES.downs);
  },

  addDoor() {
    this.doorsOpened++;
    PlayerInfo.addExp(EXP_VALUES.doorsOpened);
  },
  addTrapBuy() {
  this.trapBuys++;
  PlayerInfo.addExp(EXP_VALUES.trapBuys);
  },

  addTrapKill() {
    this.trapKills++;
    PlayerInfo.addExp(EXP_VALUES.trapKill);
  },
  addRoundSurvived() {
  this.roundsSurvived++;
},



};



// ===============================
// GAME OVER HTML STATS BAR
// ===============================
window.renderGameOverStats = function () {
  let bar = document.getElementById('gameOverStats');

  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'gameOverStats';
    bar.style.cssText = `
      display:flex;
      gap:28px;
      margin:24px 0;
      padding:12px 24px;
      background:rgba(0,0,0,0.5);
      border-radius:10px;
      font-size:20px;
      font-weight:600;
    `;
    document.getElementById('gameOver').insertBefore(
      bar,
      document.getElementById('restartBtn')
    );
  }

  bar.innerHTML = `
    <div>🏁 Rounds Survived: ${PlayerStats.roundsSurvived}</div>
    <div>💰 Points Earned: ${PlayerStats.totalPointsEarned}</div>
    <div>🔧 Upgrades: ${PlayerStats.upgrades}</div>
    <div>☠ Kills: ${PlayerStats.kills}</div>
    <div>🧨 Trap Kills: ${PlayerStats.trapKills}</div>
    <div>⚙ Trap Buys: ${PlayerStats.trapBuys}</div>
    <div>💀 Downs: ${PlayerStats.downs}</div>
    <div>🚪 Doors: ${PlayerStats.doorsOpened}</div>
  `;
};



// ===============================
// PAUSE MENU CANVAS DRAW
// ===============================
window.drawPauseStatsBar = function (ctx, canvas) {
  const y = canvas.height / 2 + 300;

  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  ctx.font = '18px system-ui';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fff';

  const stats = [
    `Rounds: ${PlayerStats.roundsSurvived}`,
    `Points Earned: ${PlayerStats.totalPointsEarned}`,
    `Upgrades: ${PlayerStats.upgrades}`,
    `Kills: ${PlayerStats.kills}`,
    `Trap Kills: ${PlayerStats.trapKills}`,
    `Trap Buys: ${PlayerStats.trapBuys}`,
    `Downs: ${PlayerStats.downs}`,
    `Doors: ${PlayerStats.doorsOpened}`
  ];

  const spacing = 180;
  const startX =
    canvas.width / 2 - ((stats.length - 1) * spacing) / 2;

  stats.forEach((txt, i) => {
    ctx.fillText(txt, startX + i * spacing, y);
  });

  ctx.restore();
};
