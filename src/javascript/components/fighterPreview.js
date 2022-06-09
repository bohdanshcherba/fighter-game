import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  // todo: show fighter info (image, name, health, etc.)

  const fighterDetail = createElement({ tagName: 'div', className: 'fighter-preview___detail' });
  const fighterDetailInfo = createElement({ tagName: 'div', className: 'fighter-preview___info' });
  const { name, attack, defense, health } = fighter;

  const info_text = `Name: ${name} <br> Health: ${health} <br> Attack: ${attack} <br> Defense: ${defense}`

  const imageElement = createFighterImage(fighter);
  fighterDetailInfo.innerHTML= info_text


  fighterDetail.appendChild(imageElement);
  fighterDetail.appendChild(fighterDetailInfo);

  fighterElement.appendChild(fighterDetail);

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
