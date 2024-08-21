import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, IPhysics2DContact, Node } from 'cc';
import { ColliderTag } from './enum';
import { MapControl } from './manager/mapControl';
const { ccclass, property } = _decorator;

@ccclass('deathPoint')
export class deathPoint extends Component {
    @property(BoxCollider2D)
    collider: BoxCollider2D | null = null;

    @property(MapControl)
    map: MapControl | null = null;

    start() {
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact) {
        console.log('deathPoint contact');
        if (otherCollider.tag == ColliderTag.Shjt) {
            this.map.missFood();
            this.scheduleOnce(() => {
                otherCollider.node.destroy();
            }, 0);
        }
    }
}


