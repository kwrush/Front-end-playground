import normalized from '../css/normalize.css'
import styles from '../css/app.css'
import {base} from './const';
import Controller from './components/controller'

let ctrl = new Controller({
    levels: base.LEVELS,
    currentLevel: 0
});

ctrl.start();