import { _decorator, Component, Label, Node } from 'cc';
import { HomeUI } from '../ui/homeUI';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    @property(Label)
    score: Label | null = null;

    @property(HomeUI)
    home: HomeUI | null = null;

    private static _instance: UIManager;
    public static get instance(): UIManager {
        if (!this._instance) {
            this._instance = new UIManager;
        }
        return this._instance;
    }

    onLoad() {
        if (!UIManager._instance) {
            UIManager._instance = this;
        } else {
            this.destroy();
        }
    }

    start() {
        this.openHome();
    }

    openHome() {
        this.home.node.active = true;
        this.score.string = data.score.toString();
    }

    startGame() {
        this.home.node.active = false;
    }

    upHeath(score: number) {
        this.score.string = score.toString();
    }

    loseGame(score: number) {

    }
}


