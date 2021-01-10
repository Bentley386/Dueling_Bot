class Player {
    static MAX_HP = 9900;
    
    constructor(id){
        this.id = id;
        this.hp = Player.MAX_HP;
    }
}
module.exports = Player;