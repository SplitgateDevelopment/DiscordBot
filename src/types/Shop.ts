import { ButtonStyle } from 'discord.js';

type viewSections = 'Esports' | 'Daily Items' | 'Value Bundle' | 'Featured Items';

type view = {
  title: viewSections;
  viewId: string;
  updatedAt: string;
  displayOrder: number;
  name: viewSections;
};

type viewButtonEmojis = {
    [key in viewSections] : string;
}

type viewSection = {
    title: viewSections;
    name: string;
    itemIds: string[];
    type: string;
    endDate: string;
    startDate: string;
    items: item[];
}

type item = {
    title: string;
    name: string;
    itemId: string;
    purchasable: boolean;
    thumbnailUrl?: string;
    regionData: price[];
    rarity: string;
    customizationType?: string;
    itemType: string;
    maxCountPerUser?: number;
    categoryPath?: string;
    updatedAt: string;
    createdAt: string;
}

type price = {
    price: number,
    discountPercentage: number;
    discountAmount: number;
    discountedPrice: number;
    currencyCode: string;
}

export {
    view,
    viewButtonEmojis,
    viewSections,
    viewSection,
    item,
}