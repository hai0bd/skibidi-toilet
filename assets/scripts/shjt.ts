import { _decorator, BoxCollider2D, Component, Node, RigidBody2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Shjt')
export class Shjt extends Component {
    speed: number = 0;

    update(deltaTime: number) {
        const pos = this.node.getPosition();
        pos.y -= this.speed * deltaTime;
        this.node.setPosition(pos);
    }
}


