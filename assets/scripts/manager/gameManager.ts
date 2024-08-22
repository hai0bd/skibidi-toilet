import { _decorator, Component, instantiate, Node, Prefab, UITransform } from 'cc';
import { MapControl } from './mapControl';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(UITransform)
    gameTf: UITransform | null = null;

    @property(Prefab)
    mapPrefab: Prefab | null = null;

    map: MapControl = null;

    private static _instance: GameManager;
    public static get instance(): GameManager {
        if (!this._instance) {
            this._instance = new GameManager;
        }
        return this._instance;
    }

    onLoad() {
        if (!GameManager._instance) {
            GameManager._instance = this;
        } else {
            this.destroy();
        }

    }

    startGame() {
        if (this.map) this.map.node.destroy();
        const map = instantiate(this.mapPrefab);
        this.node.addChild(map);
        this.map = map.getComponent(MapControl);
    }

    loseGame(score: number) {
        this.map.enabled = false;
        data.score += score;
    }
}


