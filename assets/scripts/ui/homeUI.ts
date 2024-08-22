import { _decorator, Component, easing, Node, tween, UIOpacity } from 'cc';
import { GameManager } from '../manager/gameManager';
import { UIManager } from '../manager/uiManager';
const { ccclass, property } = _decorator;

@ccclass('HomeUI')
export class HomeUI extends Component {
    play() {
        GameManager.instance.startGame();
        UIManager.instance.startGame();
    }
    setting() {

    }
}


