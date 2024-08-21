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

    start() {
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_PRESSING, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        instance.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        instance.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact) {
        console.log('player contact');
        if (otherCollider.tag == ColliderTag.Shjt) {
            this.map.upHeath();
            this.scheduleOnce(() => {
                otherCollider.node.destroy();
            }, 0);
        }
    }

    onKeyDown(event: EventKeyboard) {
        if (event.keyCode == KeyCode.KEY_D) {
            this.control.keyRight = true;
        }
        else if (event.keyCode == KeyCode.KEY_A) {
            this.control.keyLeft = true;
        }
    }
    onKeyUp(event: EventKeyboard) {
        if (event.keyCode == KeyCode.KEY_D) {
            this.control.keyRight = false;
        }
        else if (event.keyCode == KeyCode.KEY_A) {
            this.control.keyLeft = false;
        }
    }

    onTouchMove(event: EventTouch, data: JoystickDataType) {
        this.setDirection(data.moveVec);
        this.setSpeed(data.speedType);
    }

    onTouchEnd(event: EventTouch, data: JoystickDataType) {
        this.control.keyLeft = false;
        this.control.keyRight = false;
    }

    setDirection(moveDir: Vec3) {
        if (moveDir.x < 0) {
            this.control.keyLeft = true;
            this.control.keyRight = false;
        }
        else if (moveDir.x > 0) {
            this.control.keyLeft = false;
            this.control.keyRight = true;
        }
        else {
            this.control.keyLeft = false;
            this.control.keyRight = false;
        }
    }
    setSpeed(speedType: SpeedType) {
        if (speedType == SpeedType.NORMAL) {
            this.speed = 300;
        }
        else if (speedType == SpeedType.FAST) {
            this.speed = 400;
        }
        else this.speed = 0;
    }

    update(deltaTime: number) {
        if (this.control.keyLeft == true && this.control.keyRight == false) {
            this.movePlayer(-1, deltaTime);
        }
        else if (this.control.keyRight == true && this.control.keyLeft == false) {
            this.movePlayer(1, deltaTime);
        }
        else this.movePlayer(0, deltaTime);
    }

    movePlayer(direction: number, deltaTime: number) {
        const wallPos = GameManager.instance.gameTf.width / 2;
        const pos = this.node.getPosition();


        pos.x += direction * this.speed * deltaTime;
        if (pos.x < -wallPos + 40 || pos.x > wallPos - 40) return;
        this.node.setPosition(pos);
    }
}


