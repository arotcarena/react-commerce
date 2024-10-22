export const formatPrice = (price: string): string => {
    const priceNumber = parseFloat(price);

    const formater = Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });

    return formater.format(priceNumber);
}