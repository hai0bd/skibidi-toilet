import { _decorator, BoxCollider2D, CCFloat, Collider2D, Component, Contact2DType, EventKeyboard, EventTouch, Input, input, IPhysics2DContact, KeyCode, Node, Vec2, Vec3 } from 'cc';
import { ColliderTag } from './enum';
import { MapControl } from './manager/mapControl';
import { GameManager } from './manager/gameManager';
import { instance, JoystickDataType, SpeedType } from '../cocos-creator-joystick-0.2.0/assets/scripts/Joystick';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    @property(BoxCollider2D)
    collider: BoxCollider2D | null = null;

    @property(MapControl)
    map: MapControl | null = null;

    @property(CCFloat)
    speed: number = 1;

    control = {
        keyLeft: false,
        keyRight: false
    };

    wallPos: Vec2 = new Vec2();
    lastTouch: Vec2 = new Vec2();

    start() {
        this.wallPos.x = GameManager.instance.gameTf.width / 2;
        this.wallPos.y = GameManager.instance.gameTf.height / 2;
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact) {
        if (otherCollider.tag == ColliderTag.Shjt) {
            this.map.upHeath();
            this.scheduleOnce(() => {
                otherCollider.node.destroy();
            }, 0);
        }
    }
    onTouchMove(event: EventTouch) {
        const touch = event.touch.getUILocation();
        this.lastTouch = new Vec2(touch.x - this.wallPos.x, touch.y - this.wallPos.y);

        if (this.lastTouch.x > this.wallPos.x - 40 || this.lastTouch.x < -this.wallPos.x + 40) return;

        const pos = this.node.getPosition();
        pos.x = this.lastTouch.x;
        this.node.setPosition(pos);
    }
}


