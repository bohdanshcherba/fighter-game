import { createFighterImage } from '../fighterPreview';
import { createElement } from '../../helpers/domHelper';
import { showModal } from './modal';
import {fighterService} from "../../services/fightersService";
import {createFighters} from "../fightersView";

export async function showWinnerModal(fighter) {
  // call showModal function
    const winner = createFighter(fighter)


    showModal({ title:`Win ${fighter.name}`,
        bodyElement: winner,
        onClose: ()=>{
            document.location.reload()
        }
    })
}

function createFighter(fighter) {
    const imgElement = createFighterImage(fighter);
    const fighterElement = createElement({
        tagName: 'div',

    });

    fighterElement.append(imgElement);
    return fighterElement;
}
