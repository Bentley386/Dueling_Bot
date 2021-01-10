const Game = require("./Game");

class Manager {
    static PREFIX = "<";
    static DUEL = "duel";
    static HELP = "help";
    static POLY = "poly";

    static MSG_NOGAME = "No game currently in progress!";
    static MSG_HELP = "For a list of commands, look at the source code.";

    constructor(){
        this.game = undefined;
    }

    onMessage = (msg) => {
        if (msg.content[0] == Manager.PREFIX) {
            let user = msg.author.id;
            let channel = msg.channel;
            let command = msg.content.slice(1);
            switch (command){
                case Manager.DUEL:
                    this.duelRequest(user,channel);
                    break;
                case Manager.HELP:
                    this.printHelp(channel);
                    break;
                case Manager.POLY:
                    this.polyAttack(user,channel);
                    break;
            }
        }
    }

    duelRequest = (user, channel) => {
        if (typeof(this.game) == "undefined"){
            this.game = new Game(user, channel, this);
        } else {
            this.game.addUser(user,channel);
        }
    }

    polyAttack = (user,channel) => {
        if (typeof(this.game) == "undefined"){
            channel.send(Manager.MSG_NOGAME);
        } else {
            this.game.polyAttack(user,channel)
        }
    }
    printHelp(channel) {
        channel.send(Manager.MSG_HELP);
    }
    endDuel = () => {
        this.game = undefined;
    }
}
module.exports = Manager;