class Polypore {
    static MIN_DAMAGE = 786*0.759*2;
    static MAX_DAMAGE = 786*2.3*2;
    static ATTACK = (user,dmg) => `<@${user.id}> casts a polypore strike and deals ${dmg} damage!`;

    constructor(channel){
        this.channel = channel;
    }

    calcDamage(){
        let rng = Math.random();
        let dmg  = Polypore.MAX_DAMAGE*rng + Polypore.MIN_DAMAGE*(1-rng);
        return Math.floor(dmg);
    }

    attack(attacker, defender, channel){
        let dmg = this.calcDamage();
        this.channel.send(Polypore.ATTACK(attacker,dmg));
        defender.hp -= dmg;
    }
}
module.exports = Polypore;