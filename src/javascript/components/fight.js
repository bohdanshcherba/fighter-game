import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {

  return new Promise((resolve) => {
    let healthFirst = firstFighter.health;
    let healthSecond = secondFighter.health;
    let defenceOne = firstFighter.defense;
    let defenceTwo = secondFighter.defense;
    let attackOne = firstFighter.attack;
    let attackTwo = secondFighter.attack;
    document.getElementById('left-fighter-indicator').style.width = `${healthFirst}%`;
    document.getElementById('right-fighter-indicator').style.width = `${healthSecond}%`;

    let CriticalKeyOne = []
    let CanCriticalOne = true
    let CriticalKeyTwo = []
    let CanCriticalTwo = true

    const timeForReloadCritical = 10000 // ms

    // resolve the promise with the winner when fight is over
    document.addEventListener('keyup', function handler (event) {

      switch (event.code){
        case controls.PlayerOneAttack:
          const damage1 = getDamage(firstFighter, secondFighter);

          healthSecond = healthSecond - ((damage1 * 100) / secondFighter.health);

          document.getElementById('right-fighter-indicator').style.width = `${healthSecond}%`;
          break
        case controls.PlayerTwoAttack:
          const damage2 = getDamage(secondFighter, firstFighter);

          healthFirst = healthFirst - ((damage2 * 100) / firstFighter.health);

          document.getElementById('left-fighter-indicator').style.width = `${healthFirst}%`;
          break
        case controls.PlayerOneBlock:
          firstFighter.defense = defenceOne;
          firstFighter.attack = attackOne
          break
        case controls.PlayerTwoBlock:
          secondFighter.defense = defenceTwo;
          secondFighter.attack = attackTwo
          break
      }
      if (controls.PlayerOneCriticalHitCombination.includes(event.code)) {
        CriticalKeyOne = []
      }
      if (controls.PlayerTwoCriticalHitCombination.includes(event.code)) {
        CriticalKeyTwo = []
      }

      if (healthSecond <= 0) {
        document.getElementById('right-fighter-indicator').style.width = `${0}%`;
        document.removeEventListener('keyup', handler);
        document.removeEventListener('keydown', handler);

        resolve(firstFighter);

      }
      if (healthFirst <= 0) {
        document.getElementById('left-fighter-indicator').style.width = `${0}%`;
        document.removeEventListener('keyup', handler);
        document.removeEventListener('keydown', handler);

        resolve(secondFighter);

      }
    })
    document.addEventListener('keydown', function handler(event) {
      switch (event.code){
        case controls.PlayerOneBlock:
          firstFighter.defense = 100;
          firstFighter.attack = 0;

          break
        case controls.PlayerTwoBlock:
          secondFighter.defense = 100;
          secondFighter.attack = 0;
          break
      }
      if (controls.PlayerOneCriticalHitCombination.includes(event.code)) {
        CriticalKeyOne.push(event.code)
        if(CriticalKeyOne.length === 3 && CanCriticalOne){
          CanCriticalOne = false
          let damage = getCriticalPower(firstFighter)
          healthSecond = healthSecond - ((damage * 100) / secondFighter.health);
          if (healthSecond <= 0) {
            document.getElementById('right-fighter-indicator').style.width = `${0}%`;
            document.removeEventListener('keyup', handler);
            document.removeEventListener('keydown', handler);
            resolve(firstFighter);
          }
          document.getElementById('right-fighter-indicator').style.width = `${healthSecond}%`;

          setTimeout(() => {
            CanCriticalOne = true;
          }, timeForReloadCritical);
        }
      }
      if (controls.PlayerTwoCriticalHitCombination.includes(event.code)) {
        CriticalKeyTwo.push(event.code)

        if(CriticalKeyTwo.length === 3 && CanCriticalTwo){
          CanCriticalTwo = false

          let damage = getCriticalPower(secondFighter)
          healthFirst = healthFirst - ((damage * 100) / firstFighter.health);
          if (healthFirst <= 0) {
            document.getElementById('left-fighter-indicator').style.width = `${0}%`;
            document.removeEventListener('keyup', handler);
            document.removeEventListener('keydown', handler);
            resolve(secondFighter);

          }

          document.getElementById('left-fighter-indicator').style.width = `${healthFirst}%`;

          setTimeout(() => {
            CanCriticalTwo = true;
          }, timeForReloadCritical);
        }
      }
    })

  });
}

function getCriticalPower(attacker){
  return attacker.attack * 2
}

export function getDamage(attacker, defender) {
  // return damage
  const damage = getHitPower(attacker) - getBlockPower(defender);
  if (damage > 0) {
    return damage;
  } else {
    return 0;
  }
}

export function getHitPower(fighter) {
  const criticalHitChance = Math.random() * 2
  // return hit power
  if (criticalHitChance > 1){
    return fighter.attack * criticalHitChance
  }
  else {
    return fighter.attack
  }
}

export function getBlockPower(fighter) {
  // return block power
  const dodgeChance = Math.random() * 2
  // return hit power
  if (dodgeChance  > 1){
    return fighter.defense * dodgeChance
  }
  else {
    return fighter.defense
  }

}

