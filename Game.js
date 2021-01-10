const { Channel } = require("discord.js");
const Player = require("./Player");
const Polypore = require("./Polypore");

class Game {
    static MSG_IN_PROGRESS = "There is already a duel in progress.";
    static MSG_WRONG_CHAN = "There is already a duel request in place in another channel.";
    static MSG_TURN = "It's not your turn.";
    static MSG_DUELSTATUS = (user1,user2) => `<@${user1.id}>: ${user1.hp} HP, <@${user2.id}>: ${user2.hp} HP.`
    static MSG_DUELCHALLENGE = (user) => `<@${user.id}> wants to duel! Type <duel to accept his challenge!`;
    static MSG_DUELACCEPT = (user1,user2) => `<@${user1.id}> has accepted <@${user2.id}>'s challenge!`;
    static MSG_USERDIES = (user) => `<@${user.id}> dies!`;
    static MSG_GO = (user) => `<@${user.id}> goes first! Type <poly to attack!`; 

    constructor(user,channel,manager){
        this.user1 = new Player(user);
        this.user2 = undefined;
        this.channel = channel;
        this.manager = manager;

        this.channel.send(Game.MSG_DUELCHALLENGE(this.user1));
    }
    addUser = (user, channel) => {
        if (channel != this.channel){
            channel.send(Game.WRONG_CHAN);
        }
        if (typeof(this.user2) == "undefined") {
            this.startDuel(user,channel);
        } else {
            channel.send(Game.IN_PROGRESS);
        }
    }

    startDuel = (user,channel) => {
        this.user2 = new Player(user);
        this.channel.send(Game.MSG_DUELACCEPT(this.user2,this.user1));
        this.turn = (Math.random() < 0.5) ? 1 : 2;
        this.channel.send(Game.MSG_GO((this.turn==1) ? this.user1 : this.user2));
        this.poly = new Polypore(channel);
    }

    endDuel = () => {
        this.manager.endDuel();
    }

    polyAttack = (user,channel) => {
        if (channel != this.channel){
            channel.send(Game.WRONG_CHAN);
        }
        if (this.turn == 1){
            if (user != this.user1.id) {
                this.channel.send(Game.MSG_TURN);
            } else {
                this.poly.attack(this.user1,this.user2,this.channel);
            }
        }
        else {
            if (user != this.user2.id) this.channel.send(Game.MSG_TURN);
            else {
                this.poly.attack(this.user2,this.user1,this.channel);
            }
        }
        this.endTurn();
    }

    endTurn = () => {
        this.channel.send(Game.MSG_DUELSTATUS(this.user1,this.user2));
        if (this.user1.hp <= 0){
            this.channel.send(Game.MSG_USERDIES(this.user1));
            this.endDuel();
        } else if (this.user2.hp <= 0){
            this.channel.send(Game.MSG_USERDIES(this.user2));
            this.endDuel();
        }
        this.turn = 3 - this.turn;
    }
}
module.exports = Game;