import { ButtonStyle } from 'discord.js';

type viewSections = 'Esports' | 'Daily Items' | 'Value Bundle' | 'Featured Items';

type view = {
  title: viewSections;
  viewId: string;
  updatedAt: string;
  displayOrder: number;
  name: viewSections;
};

type viewButton = {
    emoji: string;
    style: ButtonStyle
}

type viewButtonData = {
    [key in viewSections] : viewButton;
}

export {
    view,
    viewButtonData
}