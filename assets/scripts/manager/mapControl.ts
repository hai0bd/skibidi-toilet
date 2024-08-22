import { _decorator, CCFloat, CCInteger, Component, instantiate, math, Node, Prefab, Vec3 } from 'cc';
import { GameManager } from './gameManager';
import { UIManager } from './uiManager';
import { Shjt } from '../shjt';
const { ccclass, property } = _decorator;

@ccclass('MapControl')
export class MapControl extends Component {
    @property(Prefab)
    shjtPrefab: Prefab;

    @property(CCInteger)
    score: number = 0;

    @property(CCInteger)
    lifeTime: number = 3;

    @property(CCFloat)
    speed: number = 100;

    @property(CCFloat)
    durationTime: number = 2;

    start() {
        this.init()
    }

    init() {
        const rand = math.randomRange(1, 3);
        for (let i = 0; i < rand; i++) {
            this.spawnShjt();
        }
        this.speed += 10;

        this.schedule(this.init, this.durationTime -= 0.01);
    }

    spawnShjt() {
        const speed = this.speed;
        const shjt = instantiate(this.shjtPrefab);
        const randomX = math.randomRange(-300, 300);
        const randomY = math.randomRange(235, 600);
        shjt.setPosition(new Vec3(randomX, randomY, 0));
        shjt.getComponent(Shjt).speed = speed;
        this.node.addChild(shjt);
    }

    upHeath() {
        this.score++;
        UIManager.instance.upHeath(this.score);
    }

    missFood() {
        this.lifeTime--;
        if (this.lifeTime <= 0) {
            GameManager.instance.loseGame(this.score);
            UIManager.instance.loseGame(this.score);
        }
    }
}


